export default () => ({
  filter (entity) {
    return entity.lifetime !== undefined
  },
  update (entity, { dt }) {
    entity.lifetime -= dt
    if (entity.lifetime <= 0) {
      this.removeEntity(entity)
    }
  }
})
