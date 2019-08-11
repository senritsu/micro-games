<template lang="html">
  <DivSprite :size="[40, 40]" :position="position">
    <img v-if="type === 'fighter'" class="enemy" src="@/assets/vuetify.svg">
    <img v-if="type === 'elite'" class="enemy" src="@/assets/vuesax.png">
    <img v-if="type === 'station'" class="enemy" src="@/assets/element.svg">
    <img v-if="type === 'boss'" class="enemy" src="@/assets/quasar.svg">
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
}
</style>
