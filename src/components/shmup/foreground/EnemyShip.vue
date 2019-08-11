<template lang="html">
  <DivSprite :size="[40, 40]" :position="position">
    <img v-if="type === 'fighter'" class="enemy" :class="[type]" src="@/assets/vuetify.svg">
    <img v-if="type === 'elite'" class="enemy" :class="[type]" src="@/assets/vuesax.png">
    <img v-if="type === 'station'" class="enemy" :class="[type]" src="@/assets/element.svg">
    <img v-if="type === 'boss'" class="enemy" :class="[type]" src="@/assets/quasar.svg">
  </DivSprite>
</template>

<script>
import DivSprite from '@/components/shmup/DivSprite'

export default {
  components: {
    DivSprite
  },
  props: {
    type: String,
    collider: Object
  },
  computed: {
    position () {
      return [
        this.collider.x,
        this.collider.y
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.enemy {
  height: 40px;

  &.boss, &.station {
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
