<template lang="html">
  <SimpleParticle :position="position" :size="size" :class="[type]" />
</template>

<script>
import SimpleParticle from '@/components/shmup/SimpleParticle'

export default {
  components: {
    SimpleParticle
  },
  props: {
    position: Array,
    type: String
  },
  computed: {
    size () {
      switch (this.type) {
        case 'pickup': return 10
        case 'explosion': return 50
        default: throw new Error(`invalid effect type '${this.type}'`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .particle.pickup {
  background-color: rgba(0, 255, 255, 0.5);
}
::v-deep .particle.explosion {
  background-color: rgba(255, 180, 50, 0.5);
}
</style>
