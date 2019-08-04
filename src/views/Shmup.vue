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

          <DivSprite :size="[30, 30]" :position="[-100, 300]">
            <img class="powerup" src="../assets/made-with-vue.png">
          </DivSprite>
          <DivSprite :size="[30, 30]" :position="[100, 300]">
            <img class="powerup" src="../assets/made-with-vuetify.png">
          </DivSprite>
        </template>
      </template>
    </GameCanvas>

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

import DivSprite from '@/components/shmup/DivSprite'
import FakeHelloWorld from '@/components/shmup/FakeHelloWorld'
import Copyright from '@/components/shmup/Copyright'

import { glMatrix, vec2 } from 'gl-matrix'

import MachineMixin from '@/mixins/MachineMixin'
import KeymapMixin from '@/mixins/KeymapMixin'
import { delay } from '@/utilities'

glMatrix.setMatrixArrayType(Array)

export default {
  name: 'shmup',
  components: {
    GameCanvas,
    MainLoop,
    PlanetLayer,
    RockLayer,
    DustLayer,
    DivSprite,
    FakeHelloWorld,
    Copyright
  },
  mixins: [
    MachineMixin,
    KeymapMixin
  ],
  keymap: {
    'up': { flag: 'upPressed' },
    'down': { flag: 'downPressed' },
    'left': { flag: 'leftPressed' },
    'right': { flag: 'rightPressed' }
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
      playerPosition: [0, 100],
      playerDirectionalInput: [0, 0],
      playerVelocity: 350
    }
  },
  methods: {
    before () {
      let v = vec2.create()

      if (this.leftPressed && !this.rightPressed) {
        vec2.add(v, v, [-1, 0])
      }
      if (!this.leftPressed && this.rightPressed) {
        vec2.add(v, v, [1, 0])
      }
      if (this.upPressed && !this.downPressed) {
        vec2.add(v, v, [0, 1])
      }
      if (!this.upPressed && this.downPressed) {
        vec2.add(v, v, [0, -1])
      }

      this.playerDirectionalInput = v
    },
    fixed ({ dt }) {
      if (this.state !== 'menu') return

      let v = vec2.clone(this.playerDirectionalInput)
      vec2.scale(v, v, dt * this.playerVelocity)

      let pos = vec2.clone(this.playerPosition)
      vec2.add(pos, pos, v)

      if (pos[0] < -175) {
        pos[0] = -175
      }
      if (pos[0] > 175) {
        pos[0] = 175
      }
      if (pos[1] < 25) {
        pos[1] = 25
      }
      if (pos[1] > 575) {
        pos[1] = 575
      }

      this.playerPosition = pos
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
