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
      entity.collider.x = entity.position.x
      entity.collider.y = entity.position.y
    },
    postUpdate () {
      system.update()
    },
    leave (entity) {
      entity.collider.remove()
    }
  }
}
