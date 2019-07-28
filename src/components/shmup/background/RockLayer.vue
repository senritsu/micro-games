<template lang="html">
  <ParticleField
    :scroll-speed="100"
    :count="30"
    :size="[4, 8]"
  />
</template>

<script>
import ParticleField from './ParticleField'

export default {
  components: {
    ParticleField
  }
}
</script>

<style lang="scss" scoped>
::v-deep .particle {
  background-color: white;
  opacity: 0.1
}
</style>
