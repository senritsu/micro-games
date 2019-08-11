export default (canvasSize, buffer = 50) => {
  const xMin = -(canvasSize[0] / 2) - buffer
  const xMax = canvasSize[0] / 2 + buffer
  const yMin = 0 - buffer
  const yMax = canvasSize[1] + buffer

  return {
    filter (entity) {
      return (entity.projectile || entity.enemy) && entity.position
    },
    update (entity) {
      if (entity.position[1] < yMin || entity.position[1] > yMax || entity.position[0] < xMin || entity.position[0] > xMax) {
        this.removeEntity(entity)
      }
    }
  }
}
