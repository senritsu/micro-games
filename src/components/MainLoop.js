export default {
  props: {
    fixedTimestep: {
      type: Number, // milliseconds
      default: 1000 / 120
    },
    fpsLimit: {
      type: Number,
      default: Infinity
    }
  },
  data () {
    return {
      remainingSimulationTime: 0,
      lastFrameTimestamp: 0,
      running: false
    }
  },
  computed: {
    minimumFrameDelta () {
      if (this.fpsLimit === 0) {
        // TODO handle pausing the loop
        return Infinity
      }

      return 1000 / this.fpsLimit
    }
  },
  methods: {
    processFrame (timestamp) {
      this.handle = requestAnimationFrame(this.processFrame)

      if (timestamp < this.lastFrameTimestamp + this.minimumFrameDelta) return

      // NOTE in seconds for consumers, more useful that way
      const t = timestamp / 1000
      const dt = (timestamp - this.lastFrameTimestamp) / 1000

      this.remainingSimulationTime += timestamp - this.lastFrameTimestamp
      this.lastFrameTimestamp = timestamp

      const remainingFixedUpdateSteps = this.remainingSimulationTime / this.fixedTimestep
      this.$emit('before', { t, dt, remainingSimulationTime: this.remainingSimulationTime, remainingFixedUpdateSteps })

      let fixedUpdatesThisFrame = 0

      while (this.remainingSimulationTime >= this.fixedTimestep) {
        this.$emit('fixed', { t, dt: this.fixedTimestep / 1000 })
        this.remainingSimulationTime -= this.fixedTimestep

        fixedUpdatesThisFrame++
        if (fixedUpdatesThisFrame >= 240) {
          break
        }
      }

      this.$emit('update', { t, dt })

      const fixedUpdateLag = this.remainingSimulationTime / this.fixedTimestep
      const skippedFixedUpdateSteps = Math.floor(fixedUpdateLag)
      this.$emit('draw', { t, dt, fixedUpdateLag, skippedFixedUpdateSteps })
    },
    stop () {
      this.running = false
      cancelAnimationFrame(this.handle)
    }
  },
  render () {
    return null
  },
  watch: {
    minimumFrameDelta (delta) {
      if (delta === Infinity) {
        this.stop()
      }
    }
  },
  created () {
    this.handle = requestAnimationFrame(timestamp => {
      this.$emit('draw', { t: timestamp, dt: 0, fixedUpdateLag: 0, skippedFixedUpdateSteps: 0 })

      this.running = true
      this.lastFrameTimestamp = timestamp

      this.handle = requestAnimationFrame(this.processFrame)
    })
  },
  beforeDestroy () {
    this.stop()
  }
}
