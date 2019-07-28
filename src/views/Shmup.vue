<template lang="html">
  <div class="shmup">
    <GameCanvas :size="[400, 600]" class="game" :class="{intro, running}">
      <DivSprite :size="[40, 40]" :position="[0, 100]">
        <img class="ship" :class="{intro, running}" alt="Vue logo" src="../assets/logo.png">
      </DivSprite>
      <FakeHelloWorld v-if="!running" msg="Welcome to Your Vue.js Shmup" />
    </GameCanvas>
  </div>
</template>

<script>
import GameCanvas from '@/components/shmup/GameCanvas'
import DivSprite from '@/components/shmup/DivSprite'
import FakeHelloWorld from '@/components/shmup/FakeHelloWorld'

export default {
  name: 'shmup',
  components: {
    GameCanvas,
    DivSprite,
    FakeHelloWorld
  },
  data () {
    return {
      intro: true,
      running: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.intro = false

      setTimeout(() => {
        this.running = true
      }, 1500)
    }, 1750)
  }
}
</script>

<style lang="scss" scoped>
.shmup {
  display: flex;
  flex-direction: column;
  align-items: center;

  .game {
    transition: background-color 0.5s;

    &.running {
      background-color: black;
    }

    .ship {
      height: 40px;
      transform: rotateZ(-180deg);

      &.intro {
        transform: translate(0, -400px) scale(5) rotateZ(0);
      }

      &:not(.running) {
        transition: transform 1.5s;
      }
    }
  }
}
</style>
