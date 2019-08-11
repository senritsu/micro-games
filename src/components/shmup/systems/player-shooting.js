import { vec2 } from 'gl-matrix'

export default (settings) => ({
  filter (entity) {
    return entity.enemy && entity.position
  },
  enter (entity) {
    entity.lastShot = 0
  },
  update (entity, { t }) {
    if (t >= (entity.lastShot + entity.enemy.shotDelay)) {
      const position = [...entity.position]
      vec2.add(position, position, [0, 20])

      this.addEntity({
        position,
        size: 4,
        v: [0, settings.enemies.projectileVelocity],
        owner: 'player'
      })

      entity.lastShot = t
    }
  }
})
