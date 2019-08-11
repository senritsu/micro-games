import { vec2 } from 'gl-matrix'
import { Collisions } from 'collisions'

import { chance, directionFromKeys } from './helpers'

export const canvasSize = [400, 600]

export const createInitialState = () => {
  const system = new Collisions()

  const state = {
    system,
    settings: {
      player: {
        velocity: 350,
        fireRate: 10, // per second
        projectileVelocity: 400
      },
      enemies: {
        spawnDelay: 1.5, // seconds
        shotDelay: 1,
        velocity: 150,
        projectileVelocity: 300
      }
    },
    input: {
      direction: [0, 0],
      fire: false
    }
  }

  reset(state)

  return state
}

export function reset (state) {
  Object.assign(state, {
    level: {
      scrollPosition: 0
    },
    timers: {
      lastShot: 0,
      lastSpawn: 0
    },
    entities: {
      player: {
        id: chance.guid(),
        collider: state.system.createCircle(0, 100, 20),
        health: 3,
        score: 0
      },
      enemies: [],
      powerups: [
        { id: chance.guid(), collider: state.system.createCircle(-100, 300, 15), type: 'health' },
        { id: chance.guid(), collider: state.system.createCircle(100, 300, 15), type: 'shield' }
      ],
      projectiles: [],
      effects: []
    }
  })

  state.settings.enemies.spawnDelay = 1.5
}

const getPosition = collider => [collider.x, collider.y]

function updateCollider (collider, [x, y]) {
  collider.x = x
  collider.y = y
}

function moveEntity ({ collider, v }, dt) {
  const pos = getPosition(collider)
  v = vec2.clone(v)
  vec2.scale(v, v, dt)
  vec2.add(pos, pos, v)

  updateCollider(collider, pos)
}

function confine (v, [xMin, xMax, yMin, yMax]) {
  if (v[0] < xMin) {
    v[0] = xMin
  }
  if (v[0] > xMax) {
    v[0] = xMax
  }
  if (v[1] < yMin) {
    v[1] = yMin
  }
  if (v[1] > yMax) {
    v[1] = yMax
  }
}

export function handleInput (state, keys) {
  state.input.fire = keys.fire
  state.input.direction = directionFromKeys(keys)
}

function updatePlayer (state, { t, dt }) {
  let v = vec2.clone(state.input.direction)
  vec2.scale(v, v, dt * state.settings.player.velocity)

  let pos = getPosition(state.entities.player.collider)
  vec2.add(pos, pos, v)

  confine(pos, [-175, 175, 25, 575])

  updateCollider(state.entities.player.collider, pos)

  if (state.input.fire && (state.timers.lastShot < t - (1 / state.settings.player.fireRate))) {
    spawnPlayerProjectile(state, 'player')
    state.timers.lastShot = t
  }
}

function updateProjectiles (state, { dt }) {
  state.entities.projectiles = state.entities.projectiles.reduce((newProjectiles, projectile) => {
    if (projectile.collider.y > 610 || projectile.collider.y < -10) return newProjectiles

    moveEntity(projectile, dt)

    newProjectiles.push(projectile)

    return newProjectiles
  }, [])
}

function updateEffects (state, { t }) {
  state.entities.effects = state.entities.effects.filter(effect => t < (effect.t + effect.duration))
}

function spawnPlayerProjectile (state) {
  const pos = getPosition(state.entities.player.collider)
  vec2.add(pos, pos, [0, 20])
  state.entities.projectiles.push({
    id: chance.guid(),
    type: 'player',
    collider: state.system.createCircle(...pos, 10),
    v: [0, state.settings.player.projectileVelocity]
  })
}

function spawnEnemyProjectile (state, enemy) {
  const pos = getPosition(enemy.collider)
  vec2.add(pos, pos, [0, -20])
  state.entities.projectiles.push({
    id: chance.guid(),
    type: 'enemy',
    collider: state.system.createCircle(...pos, 10),
    v: [0, -state.settings.enemies.projectileVelocity]
  })
}

function spawnRandomEnemy (state) {
  const x = chance.integer({ min: -175, max: 175 })
  const y = 610
  state.entities.enemies.push({
    id: chance.guid(),
    type: chance.pickone(['fighter', 'elite', 'station', 'boss']),
    collider: state.system.createCircle(x, y, 20),
    v: [0, -state.settings.enemies.velocity],
    lastShot: 0,
    shotDelay: state.settings.enemies.shotDelay
  })

  // NOTE to terminate core loop until something better exists
  state.settings.enemies.spawnDelay *= 0.98
}

function updateEnemies (state, { t, dt }) {
  if (t >= (state.timers.lastSpawn + state.settings.enemies.spawnDelay)) {
    spawnRandomEnemy(state)
    state.timers.lastSpawn = t
  }

  state.entities.enemies = state.entities.enemies.reduce((newEnemies, enemy) => {
    if (enemy.collider.y < -20) return newEnemies

    moveEntity(enemy, dt)

    if (enemy.collider.y <= 550 && t >= (enemy.lastShot + enemy.shotDelay)) {
      spawnEnemyProjectile(state, enemy)
      enemy.lastShot = t
    }

    newEnemies.push(enemy)

    return newEnemies
  }, [])
}

function checkCollisions (state, { t }) {
  for (const powerup of state.entities.powerups) {
    for (const body of powerup.collider.potentials()) {
      if (body === state.entities.player.collider && body.collides(powerup.collider)) {
        state.entities.effects.push({
          id: chance.guid(),
          position: getPosition(state.entities.player.collider),
          type: 'pickup',
          t,
          duration: 1
        })

        state.entities.powerups = state.entities.powerups.filter(x => x !== powerup)
        // NOTE temporary placeholder just to do anything at all
        state.entities.player.health++
      }
    }
  }

  for (const projectile of state.entities.projectiles.filter(x => x.type === 'enemy')) {
    for (const body of projectile.collider.potentials()) {
      if (body === state.entities.player.collider && body.collides(projectile.collider)) {
        state.entities.effects.push({
          id: chance.guid(),
          position: getPosition(state.entities.player.collider),
          type: 'hit',
          t,
          duration: 1
        })

        state.entities.projectiles = state.entities.projectiles.filter(x => x !== projectile)
        state.entities.player.health--
      }
    }
  }

  for (const projectile of state.entities.projectiles.filter(x => x.type === 'player')) {
    for (const body of projectile.collider.potentials()) {
      const enemy = state.entities.enemies.find(x => x.collider === body)

      if (enemy && body.collides(projectile.collider)) {
        state.entities.effects.push({
          id: chance.guid(),
          position: getPosition(enemy.collider),
          type: 'explosion',
          t,
          duration: 1
        })

        state.entities.projectiles = state.entities.projectiles.filter(x => x !== projectile)
        state.entities.enemies = state.entities.enemies.filter(x => x !== enemy)
        state.entities.player.score++
      }
    }
  }
}

export function update (state, frameTimings) {
  if (state.entities.player.health <= 0) return

  updatePlayer(state, frameTimings)

  updateEnemies(state, frameTimings)

  updateProjectiles(state, frameTimings)

  updateEffects(state, frameTimings)

  state.system.update()

  checkCollisions(state, frameTimings)
}
