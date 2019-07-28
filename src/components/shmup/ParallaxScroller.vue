<template lang="html">
  <div class="parallax" :style="style">
    <div class="half">
      <slot />
    </div>
    <div class="half">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scrollSpeed: {
      type: Number,
      required: true
    }
  },
  computed: {
    style () {
      return {
        animationDuration: `${900 / this.scrollSpeed}s`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.parallax {
  width: 400px;
  height: 1800px;
  position: absolute;

  top: 0;
  left: 0;

  animation-name: scroll;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  .half {
    position: absolute;
    width: 400px;
    height: 900px;

    &:nth-child(2) {
      top: 900px;
    }
  }
}

@keyframes scroll {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
