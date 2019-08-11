import { chance } from '../helpers'

export default (settings) => ({
  filter (entity) {
    return entity.enemyBrain
  },
  enter (entity) {
    entity.spawning = {
      lastSpawn: 0,
      spawnDelay: settings.enemies.spawnDelay
    }
  },
  update (entity, { t }) {
    if (t >= (entity.spawning.lastSpawn + entity.spawning.spawnDelay)) {
      const x = chance.integer({ min: -175, max: 175 })
      const y = 610

      this.addEntity({
        position: [x, y],
        size: 20,
        v: [0, -settings.enemies.velocity],
        enemy: {
          type: chance.pickone(['fighter', 'elite', 'station', 'boss']),
          lastShot: 0,
          shotDelay: settings.enemies.shotDelay
        }
      })

      entity.spawning.lastSpawn = t
      entity.spawning.spawnDelay *= 0.98
    }
  }
})
