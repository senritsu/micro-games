import { vec2 } from 'gl-matrix'
import { Collisions } from 'collisions'

import { directionFromKeys } from './helpers'

export const canvasSize = [400, 600]

export const reset = () => {
  const system = new Collisions()

  return {
    system,
    settings: {
      player: {
        velocity: 350,
        fireRate: 10, // per second
        projectileVelocity: 400
      }
    },
    input: {
      direction: [0, 0],
      fire: false
    },
    level: {

    },
    timers: {
      lastShot: 0
    },
    entities: {
      player: {
        collider: system.createCircle(0, 100, 20)
      },
      powerups: [
        { collider: system.createCircle(-100, 300, 15), type: 'health' },
        { collider: system.createCircle(100, 300, 15), type: 'shield' }
      ],
      projectiles: []
    }
  }
}

const getPosition = collider => [collider.x, collider.y]

const updateCollider = (collider, [x, y]) => {
  collider.x = x
  collider.y = y
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
    spawnPlayerProjectile(state)
    state.timers.lastShot = t
  }
}

function updateProjectiles (state, { dt }) {
  state.entities.projectiles = state.entities.projectiles.reduce((newProjectiles, projectile) => {
    if (projectile.collider.y > 600) return newProjectiles

    const pos = getPosition(projectile.collider)
    const v = vec2.clone(projectile.v)
    vec2.scale(v, v, dt)
    vec2.add(pos, pos, v)

    updateCollider(projectile.collider, pos)
    newProjectiles.push(projectile)

    return newProjectiles
  }, [])
}

function spawnPlayerProjectile (state) {
  const pos = getPosition(state.entities.player.collider)
  vec2.add(pos, pos, [0, 20])
  state.entities.projectiles.push({
    type: 'player',
    collider: state.system.createCircle(...pos, 10),
    v: [0, state.settings.player.projectileVelocity]
  })
}

function updateEnemies () {
  // spawning, ai and stuff
}

function checkCollisions (state) {
  for (const powerup of state.entities.powerups) {
    for (const body of powerup.collider.potentials()) {
      if (body === state.entities.player.collider && body.collides(powerup.collider)) {
        state.entities.powerups = state.entities.powerups.filter(x => x !== powerup)
      }
    }
  }
}

export function update (state, frameTimings) {
  updatePlayer(state, frameTimings)

  updateEnemies(state, frameTimings)

  updateProjectiles(state, frameTimings)

  state.system.update()

  checkCollisions(state)
}
