import MainLoop from 'mainloop.js'

function setup (vm) {
  MainLoop.setBegin(vm.begin || (() => {}))
  MainLoop.setUpdate(vm.update || (() => {}))
  MainLoop.setDraw(vm.draw || (() => {}))
  MainLoop.setEnd(vm.end || (() => {}))

  MainLoop.start()
}

function teardown () {
  MainLoop.stop()
}

export default {
  created () {
    setup(this)
  },
  updated () {
    setup(this)
  },
  beforeDestroy () {
    teardown()
  },
  beforeUpdate () {
    teardown()
  }
}