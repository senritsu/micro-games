<template lang="html">
  <div class="instructions">
    <p>Arrow keys to move</p>
    <p>Space to shoot</p>
    <p>Enemies and powerups not doing much yet, you can take 3 hits</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.instructions {
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0.5em;
  }
}
</style>
