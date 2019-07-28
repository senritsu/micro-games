<template lang="html">
  <ParticleField
    :scroll-speed="20"
    :count="20"
    :size="[2, 4]"
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
  background-color: rgb(150, 181, 255);
  opacity: 0.2;
  animation: sparkle 4s infinite linear;

  &:nth-child(4n + 1) {
    animation-delay: 1s;
  }
  &:nth-child(4n + 2) {
    animation-delay: 2s;
  }
  &:nth-child(4n + 3) {
    animation-delay: 3s;
  }
}

@keyframes sparkle {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
