<template lang="html">
  <div class="start-screen">
    Press Space to {{ gameover ? 're' : '' }}start
  </div>
</template>

<script>
export default {
  props: {
    gameover: Boolean
  }
}
</script>

<style lang="scss" scoped>
.start-screen {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 2em;
  color: white;
}
</style>
