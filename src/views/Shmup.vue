<template lang="html">
  <div class="shmup">
    <div class="game" :class="{intro, running}">
      <div class="player" :class="{intro, running}">
        <img class="ship" alt="Vue logo" src="../assets/logo.png">
      </div>
      <FakeHelloWorld v-if="!running" msg="Welcome to Your Vue.js Shmup" />
    </div>

  </div>
</template>

<script>
import FakeHelloWorld from '@/components/shmup/FakeHelloWorld.vue'

export default {
  name: 'shmup',
  components: {
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: background-color 0.5s;

    &.running {
      background-color: black;
    }

    .player {
      position: absolute;
      transform: translate(0, 500px);

      .ship {
        height: 40px;
        transform: translate(0, -50%) rotateZ(180deg);
      }

      &.intro .ship {
        transform: translate(0, -420px) scale(5) rotateZ(0);
      }

      &:not(.running) .ship {
        transition: transform 1.5s;
      }
    }
  }
}
.game {
  height: 600px;
  width: 400px
}
</style>
