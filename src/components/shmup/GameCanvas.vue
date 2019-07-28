<template lang="html">
  <div class="canvas" :style="style">
    <div class="background">
      <slot name="background" />
    </div>
    <div class="foreground">
      <slot name="foreground" />
    </div>
    <div class="ui">
      <slot name="ui" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Array,
      required: true
    }
  },
  computed: {
    style () {
      return {
        width: `${this.size[0]}px`,
        height: `${this.size[1]}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  position: relative;
  overflow: hidden;

  .background, .foreground, .ui {
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
