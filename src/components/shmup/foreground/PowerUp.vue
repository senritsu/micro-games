<template lang="html">
  <DivSprite :size="[30, 30]" :position="position">
    <img v-if="type === 'health'" class="powerup" src="@/assets/made-with-vue.png">
    <img v-if="type === 'shield'" class="powerup" src="@/assets/made-with-vuetify.png">
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
.powerup {
  height: 30px;
}
</style>
