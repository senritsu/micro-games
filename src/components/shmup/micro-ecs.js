import { chance } from './helpers'

export default function ECS () {
  this.entities = {}
  this.systems = []

  this.addEntity = entity => {
    const id = chance.guid()

    // NOTE vue compat
    entity = {
      ...entity,
      id
    }
    this.entities = {
      ...this.entities,
      [id]: entity
    }

    this.systems
      .filter(system => system.enter)
      .filter(system => system.filter(entity))
      .forEach(system => {
        system.enter(entity)
      })

    return entity
  }

  this.removeEntity = entity => {
    entity = this.entities[entity.id]

    delete this.entities[entity.id]
    // NOTE vue compat
    this.entities = { ...this.entities }

    this.systems
      .filter(system => system.leave)
      .filter(system => system.filter(entity))
      .forEach(system => {
        system.leave(entity)
      })
  }

  this.addSystem = system => {
    this.systems.push(system)

    system.getEntity = id => this.entities[id]
    system.findEntity = predicate => Object.values(this.entities).find(predicate)
    system.addEntity = entity => this.addEntity(entity)
    system.removeEntity = entity => this.removeEntity(entity)

    if (system.setup) {
      system.setup()
    }

    if (system.enter) {
      Object.values(this.entities)
        .filter(system.filter)
        .forEach(entity => system.enter(entity))
    }
  }

  this.removeSystem = system => {
    this.systems = this.systems.filter(x => x === system)

    delete system.getEntity
    delete system.findEntity
    delete system.addEntity
    delete system.removeEntity
  }

  this.update = frameTimings => {
    this.systems.forEach(system => {
      if (system.preUpdate) {
        system.preUpdate(frameTimings)
      }

      Object.values(this.entities)
        .filter(system.filter)
        .forEach(entity => system.update(entity, frameTimings))

      if (system.postUpdate) {
        system.postUpdate(frameTimings)
      }
    })
  }
}
