export default () => ({
  filter (entity) {
    return entity.health !== undefined && !entity.player
  },
  update (entity) {
    if (entity.health <= 0) {
      this.removeEntity(entity)
      this.addEntity({
        position: entity.position,
        effect: 'explosion',
        lifetime: 1
      })
    }
  }
})
