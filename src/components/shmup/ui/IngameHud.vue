<template lang="html">
  <div class="hud">
    <div class="score">
      {{ score }}
    </div>
    <div class="health">
      <div class="blip" v-for="i in 3" :key="i" :class="{inactive: health < i, overcharged: health >= i + 3}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
    health: Number
  }
}
</script>

<style lang="scss" scoped>
.hud {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .score {
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
    font-size: 2em;
    font-weight: bold;
    color: white;
  }

  .health {
    display: flex;
    justify-content: center;
    margin-top: auto;

    .blip {
      height: 6px;
      width: 36px;
      background-color: rgb(0, 141, 194);
      margin: 3px;

      &.inactive {
        opacity: 0.2;
      }

      &.overcharged {
        background-color: rgb(0, 194, 112);
      }
    }
  }
}
</style>
