import Mousetrap from 'mousetrap'

export default {
  created () {
    const { keymap } = this.$options

    for (const key in keymap) {
      const options = keymap[key]

      if (options.flag) {
        Mousetrap.bind(key, () => {
          this[options.flag] = true
        }, 'keydown')
        Mousetrap.bind(key, () => {
          this[options.flag] = false
        }, 'keyup')
      } else {
        Mousetrap.bind(key, () => {
          if (typeof options === 'string') {
            this[options]()
          } else if (options instanceof Function) {
            options.call(this)
          } else if (options.handler instanceof Function) {
            options.handler.call(this)
          }
        })
      }
    }
  },
  beforeDestroy () {
    for (const key in this.$options.keymap) {
      const options = this.$options.keymap[key]

      if (options.flag) {
        Mousetrap.unbind(key, 'keydown')
        Mousetrap.unbind(key, 'keyup')
      } else {
        Mousetrap.unbind(key)
      }
    }
  }
}
