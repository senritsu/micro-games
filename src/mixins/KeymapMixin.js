import keyboard from 'keyboardjs'

export default {
  created () {
    const { eventKeymap, realtimeKeymap } = this.$options

    this.$_KeymapMixin_handlers = {}

    if (realtimeKeymap) {
      for (const key in realtimeKeymap) {
        const propertyName = realtimeKeymap[key]

        if (this.$data[propertyName] === undefined) {
          throw new Error(`[KeymapMixin] invalid realtime key mapping: property ${propertyName} does not exist on Vue instance`)
        }

        const downHandler = () => {
          this[propertyName] = true
        }
        const upHandler = () => {
          this[propertyName] = false
        }

        keyboard.bind(key, downHandler, upHandler)
        this.$_KeymapMixin_handlers[key] = [downHandler, upHandler]
      }
    }

    if (eventKeymap) {
      for (const key in eventKeymap) {
        const options = eventKeymap[key]

        let handler
        if (typeof options === 'string') {
          handler = this[options]
        } else if (options instanceof Function) {
          handler = options.bind(this)
        } else if (options.handler instanceof Function) {
          handler = options.handler.bind(this)
        }
        keyboard.bind(key, handler)
        this.$_KeymapMixin_handlers[key] = [handler]
      }
    }
  },
  beforeDestroy () {
    for (const key in this.$options.keymap) {
      keyboard.unbind(key, ...this.$_KeymapMixin_handlers[key])
    }
  }
}
