<template lang="html">
  <div class="shmup">
    <GameCanvas :size="[400, 600]" class="game" :class="{intro, running}">
      <template #background>
        <ParallaxBackground :scroll-speed="200">
          <DustMote
            v-for="(star, i) in dust.slice(0, 50)" v-bind="star"
            :key="i"
          />
        </ParallaxBackground>
        <ParallaxBackground :scroll-speed="100">
          <DustMote
            v-for="(star, i) in dust.slice(50, 80)" v-bind="star"
            :key="i"
          />
        </ParallaxBackground>
        <ParallaxBackground :scroll-speed="50">
          <DustMote
            v-for="(star, i) in dust.slice(80, -1)" v-bind="star"
            :key="i"
          />
        </ParallaxBackground>
      </template>
      <template #foreground>
        <DivSprite :size="[40, 40]" :position="[0, 100]">
          <img class="ship" :class="{intro, running}" alt="Vue logo" src="../assets/logo.png">
        </DivSprite>
      </template>
    </GameCanvas>

    <FakeHelloWorld v-if="!running" msg="Welcome to Your Vue.js Shmup" />
  </div>
</template>

<script>
import Chance from 'chance'

import GameCanvas from '@/components/shmup/GameCanvas'
import ParallaxBackground from '@/components/shmup/ParallaxBackground'
import DustMote from '@/components/shmup/DustMote'
import DivSprite from '@/components/shmup/DivSprite'
import FakeHelloWorld from '@/components/shmup/FakeHelloWorld'

const chance = new Chance()

export default {
  name: 'shmup',
  components: {
    GameCanvas,
    ParallaxBackground,
    DustMote,
    DivSprite,
    FakeHelloWorld
  },
  data () {
    return {
      intro: true,
      running: false
    }
  },
  computed: {
    dust () {
      return new Array(100).fill(null).map(() => ({
        size: 2 * chance.normal(),
        position: [
          chance.integer({ min: 0, max: 400 }),
          chance.integer({ min: 0, max: 600 })
        ]
      }))
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
