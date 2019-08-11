export default (canvasSize) => {
  const xMin = -(canvasSize[0] / 2)
  const xMax = canvasSize[0] / 2
  const yMin = 0
  const yMax = canvasSize[1]

  return {
    filter (entity) {
      return entity.player && entity.position && entity.size
    },
    update (entity) {
      if (entity.position[0] < (xMin + entity.size)) {
        entity.position[0] = xMin + entity.size
      }
      if (entity.position[0] > (xMax - entity.size)) {
        entity.position[0] = xMax - entity.size
      }
      if (entity.position[1] < (yMin + entity.size)) {
        entity.position[1] = yMin + entity.size
      }
      if (entity.position[1] > (yMax - entity.size)) {
        entity.position[1] = yMax - entity.size
      }
    }
  }
}
