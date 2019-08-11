export default () => ({
  filter (entity) {
    return entity.collider && entity.powerup
  },
  update (entity) {
    for (const body of entity.collider.potentials()) {
      const other = this.entities[body.entityId]

      if (other.player && entity.collider.collides(body)) {
        if (entity.powerup.health) {
          other.health += entity.powerup.health
        }

        this.removeEntity(entity)
        this.addEntity({
          position: entity.position,
          effect: 'pickup',
          lifetime: 1
        })
      }
    }
  }
})
