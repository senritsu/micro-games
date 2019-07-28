<template lang="html">
  <div class="canvas" :style="style">
    <slot />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  .ui {
    flex: 1;
    align-self: stretch;

    display: flex;
    flex-direction: column;
  }
}
</style>
