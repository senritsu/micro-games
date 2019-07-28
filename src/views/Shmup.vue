<template lang="html">
  <div class="shmup">
    <GameCanvas :size="[400, 600]" class="game" :class="{intro, running}">
      <template v-if="running" #background>
        <PlanetLayer />
        <RockLayer />
        <DustLayer />
      </template>
      <template #foreground>
        <DivSprite :size="[40, 40]" :position="[0, 100]">
          <img class="ship player" :class="{intro, running}" src="../assets/vue.png">
        </DivSprite>
        <template v-if="running">
          <DivSprite :size="[40, 40]" :position="[-150, 500]">
            <img class="ship" src="../assets/vuetify.svg">
          </DivSprite>
          <DivSprite :size="[40, 40]" :position="[-50, 500]">
            <img class="ship" src="../assets/quasar.svg">
          </DivSprite>
          <DivSprite :size="[40, 40]" :position="[50, 500]">
            <img class="ship" src="../assets/element.svg">
          </DivSprite>
          <DivSprite :size="[40, 40]" :position="[150, 500]">
            <img class="ship" src="../assets/vuesax.png">
          </DivSprite>

          <DivSprite :size="[30, 30]" :position="[-100, 300]">
            <img class="powerup" src="../assets/made-with-vue.png">
          </DivSprite>
          <DivSprite :size="[30, 30]" :position="[100, 300]">
            <img class="powerup" src="../assets/made-with-vuetify.png">
          </DivSprite>
        </template>
      </template>
    </GameCanvas>

    <FakeHelloWorld v-if="!running" msg="Welcome to Your Vue.js Shmup" />
    <Copyright v-else />
  </div>
</template>

<script>
import GameCanvas from '@/components/shmup/GameCanvas'

import PlanetLayer from '@/components/shmup/background/PlanetLayer'
import RockLayer from '@/components/shmup/background/RockLayer'
import DustLayer from '@/components/shmup/background/DustLayer'

import DivSprite from '@/components/shmup/DivSprite'
import FakeHelloWorld from '@/components/shmup/FakeHelloWorld'
import Copyright from '@/components/shmup/Copyright'

export default {
  name: 'shmup',
  components: {
    GameCanvas,
    PlanetLayer,
    RockLayer,
    DustLayer,
    DivSprite,
    FakeHelloWorld,
    Copyright
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
    }
    .powerup {
      height: 30px;
    }

    .player.ship {
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
