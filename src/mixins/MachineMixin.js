import { Machine, interpret } from 'xstate'

export default {
  data () {
    return {
      $_FsmMixin_state: null
    }
  },
  computed: {
    state () {
      return this.$data.$_FsmMixin_state
    }
  },
  methods: {
    send (event) {
      if (!this.$_FsmMixin_service.initialized) return

      this.$_FsmMixin_service.send(event)
    }
  },
  created () {
    const machine = Machine(this.$options.machine.call(this))
    const service = interpret(machine)
    service
      .onTransition(state => {
        this.$data.$_FsmMixin_state = state.value
      })
      .start()

    this.$_FsmMixin_service = service
  },
  beforeDestroy () {
    this.$_FsmMixin_service.stop()
  }
}
