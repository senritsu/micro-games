export default () => ({
  filter (entity) {
    return entity.position && entity.v
  },
  update (entity, { dt }) {
    entity.position[0] += dt * entity.v[0]
    entity.position[1] += dt * entity.v[1]
  }
})
