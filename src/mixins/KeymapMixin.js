import keyboard from 'keyboardjs'

export default {
  created () {
    const { keymap } = this.$options

    this.$_KeymapMixin_handlers = {}

    for (const key in keymap) {
      const options = keymap[key]

      if (options.flag) {
        const downHandler = () => {
          this[options.flag] = true
        }
        const upHandler = () => {
          this[options.flag] = false
        }
        keyboard.bind(key, downHandler, upHandler)
        this.$_KeymapMixin_handlers[key] = [downHandler, upHandler]
      } else {
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
