<template lang="html">
  <div class="shmup">
    <GameCanvas :size="[400, 600]" class="game" :class="{intro: state === 'wait', running: state === 'menu'}">
      <template v-if="state === 'menu'" #background>
        <PlanetLayer />
        <RockLayer />
        <DustLayer />
      </template>
      <template #foreground>
        <DivSprite :size="[40, 40]" :position="playerPosition">
          <img class="ship player" :class="{intro: state === 'wait', running: state === 'menu'}" src="../assets/vue.png">
        </DivSprite>
        <template v-if="state === 'menu'">
          <DivSprite v-if="leftPressed" :size="[40, 40]" :position="[-150, 500]">
            <img class="ship" src="../assets/vuetify.svg">
          </DivSprite>
          <DivSprite v-if="upPressed" :size="[40, 40]" :position="[-50, 500]">
            <img class="ship" src="../assets/quasar.svg">
          </DivSprite>
          <DivSprite v-if="downPressed" :size="[40, 40]" :position="[50, 500]">
            <img class="ship" src="../assets/element.svg">
          </DivSprite>
          <DivSprite v-if="rightPressed" :size="[40, 40]" :position="[150, 500]">
            <img class="ship" src="../assets/vuesax.png">
          </DivSprite>

          <ProjectileLayer :projectiles="gameState.entities.projectiles" />

          <PowerUp v-for="(powerup, i) in gameState.entities.powerups" :key="i" v-bind="powerup" />
        </template>
      </template>
    </GameCanvas>

    <Instructions />

    <FakeHelloWorld v-if="state !== 'menu'" msg="Welcome to Your Vue.js Shmup" />
    <Copyright v-else />

    <MainLoop @before="before" @fixed="fixed" />
  </div>
</template>

<script>
import GameCanvas from '@/components/shmup/GameCanvas'
import MainLoop from '@/components/MainLoop'

import PlanetLayer from '@/components/shmup/background/PlanetLayer'
import RockLayer from '@/components/shmup/background/RockLayer'
import DustLayer from '@/components/shmup/background/DustLayer'

import ProjectileLayer from '@/components/shmup/foreground/ProjectileLayer'
import PowerUp from '@/components/shmup/foreground/PowerUp'

import DivSprite from '@/components/shmup/DivSprite'
import FakeHelloWorld from '@/components/shmup/FakeHelloWorld'
import Instructions from '@/components/shmup/Instructions'
import Copyright from '@/components/shmup/Copyright'

import { glMatrix } from 'gl-matrix'

import MachineMixin from '@/mixins/MachineMixin'
import KeymapMixin from '@/mixins/KeymapMixin'
import { delay } from '@/utilities'

import { reset, handleInput, update } from '@/components/shmup/game-logic'

glMatrix.setMatrixArrayType(Array)

export default {
  name: 'shmup',
  components: {
    GameCanvas,
    MainLoop,
    PlanetLayer,
    RockLayer,
    DustLayer,
    ProjectileLayer,
    PowerUp,
    DivSprite,
    FakeHelloWorld,
    Instructions,
    Copyright
  },
  mixins: [
    MachineMixin,
    KeymapMixin
  ],
  realtimeKeymap: {
    'up': 'upPressed',
    'down': 'downPressed',
    'left': 'leftPressed',
    'right': 'rightPressed',
    'space': 'spacePressed'
  },
  machine () {
    return {
      initial: 'wait',
      states: {
        wait: {
          on: {
            START: 'intro'
          }
        },
        intro: {
          on: {
            DONE: 'menu'
          }
        },
        menu: {
          on: {
            START: 'game'
          }
        },
        game: {
          on: {
            DEAD: 'menu'
          }
        }
      }
    }
  },
  data () {
    return {
      upPressed: false,
      downPressed: false,
      leftPressed: false,
      rightPressed: false,
      spacePressed: false,
      gameState: reset()
    }
  },
  computed: {
    playerPosition () {
      return [
        this.gameState.entities.player.collider.x,
        this.gameState.entities.player.collider.y
      ]
    }
  },
  methods: {
    before () {
      const {
        upPressed: up,
        downPressed: down,
        leftPressed: left,
        rightPressed: right,
        spacePressed: fire
      } = this

      handleInput(this.gameState, { up, down, left, right, fire })
    },
    fixed (frameTimings) {
      if (this.state !== 'menu') return

      update(this.gameState, frameTimings)
    }
  },
  async created () {
    await delay(1.75)
    this.send('START')
    await delay(1.5)
    this.send('DONE')
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
