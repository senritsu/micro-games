import { Collisions } from 'collisions'

export default () => {
  const system = new Collisions()

  return {
    filter (entity) {
      return entity.position && entity.size
    },
    enter (entity) {
      entity.collider = system.createCircle(...entity.position, entity.size)
      entity.collider.entityId = entity.id
    },
    update (entity) {
      entity.collider.x = entity.position[0]
      entity.collider.y = entity.position[1]
    },
    postUpdate () {
      system.update()
    },
    leave (entity) {
      entity.collider.remove()
    }
  }
}
