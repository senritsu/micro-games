<template lang="html">
  <div>
    <SimpleParticle
      v-for="({ position, type }, i) in projectiles"
      :key="i"
      v-bind="{position, size: sizes[type]}"
      :class="[type]"
    />
  </div>
</template>

<script>
import SimpleParticle from '@/components/shmup/SimpleParticle'

export default {
  components: {
    SimpleParticle
  },
  props: {
    projectiles: {
      type: Array,
      required: true
    }
  },
  computed: {
    sizes () {
      return {
        player: 4,
        enemy: 6
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .particle.player {
  background-color: yellow;
}
</style>
