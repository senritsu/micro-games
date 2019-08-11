export default () => ({
  filter (entity) {
    return entity.enemy && entity.health
  },
  leave (entity) {
    if (entity.health <= 0) {
      const { player } = this.findEntity(x => x.player)

      player.score += entity.enemy.score
    }
  }
})
