export default () => ({
  filter (entity) {
    return entity.collider && entity.projectile
  },
  update (entity) {
    for (const body of entity.collider.potentials()) {
      const other = this.getEntity(body.entityId)

      if (!other[entity.projectile.owner] && entity.collider.collides(body)) {
        other.health -= entity.projectile.damage

        this.removeEntity(entity)
        this.addEntity({
          position: entity.position,
          effect: 'hit',
          lifetime: 1
        })
      }
    }
  }
})
