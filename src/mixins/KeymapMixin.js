import Mousetrap from 'mousetrap'

function setup (vm) {
  const { keymap } = vm.$options

  for (const key in keymap) {
    const options = keymap[key]

    if (options.flag) {
      Mousetrap.bind(key, () => {
        vm[options.flag] = true
      }, 'keydown')
      Mousetrap.bind(key, () => {
        vm[options.flag] = false
      }, 'keyup')
    } else {
      Mousetrap.bind(key, () => {
        if (typeof options === 'string') {
          vm[options]()
        } else if (options instanceof Function) {
          options.call(vm)
        } else if (options.handler instanceof Function) {
          options.handler.call(vm)
        }
      })
    }
  }
}

function teardown (vm) {
  for (const key in vm.$options.keymap) {
    const options = vm.$options.keymap[key]

    if (options.flag) {
      Mousetrap.unbind(key, 'keydown')
      Mousetrap.unbind(key, 'keyup')
    } else {
      Mousetrap.unbind(key)
    }
  }
}

export default {
  created () {
    setup(this)
  },
  updated () {
    setup(this)
  },
  beforeUpdate () {
    teardown(this)
  },
  beforeDestroy () {
    teardown(this)
  }
}
