<template lang="html">
  <ParticleField
    :scroll-speed="200"
    :count="90"
    :size="[0, 2]"
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
}
</style>
