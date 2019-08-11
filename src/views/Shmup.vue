<template lang="html">
  <div class="shmup">
    <GameCanvas :size="[400, 600]" class="game" :class="{ intro: state === 'wait', running: state === 'menu' || state === 'game', gameover: gameState.entities.player.health <= 0 }">
      <template v-if="state === 'game'" #background>
        <PlanetLayer />
        <RockLayer />
        <DustLayer />
      </template>
      <template #foreground>
        <DivSprite :size="[40, 40]" :position="playerPosition">
          <img class="ship player" :class="{intro: state === 'wait', running: state === 'menu'}" src="../assets/vue.png">
        </DivSprite>
        <template v-if="state === 'game'">
          <EnemyShip v-for="(enemy, i) in gameState.entities.enemies" :key="enemy.id" v-bind="enemy" />

          <ProjectileLayer :projectiles="gameState.entities.projectiles" />

          <PowerUp v-for="(powerup, i) in gameState.entities.powerups" :key="powerup.id" v-bind="powerup" />

          <SpecialEffect v-for="(effect, i) in gameState.entities.effects" :key="effect.id" v-bind="effect" />
        </template>
      </template>
      <template #ui>
        <StartScreen v-if="state === 'menu'" :gameover="!gameState.entities.player.health" />
        <IngameHud v-if="state === 'game' || state === 'menu'" v-bind="gameState.entities.player" />
      </template>
    </GameCanvas>

    <Instructions />

    <FakeHelloWorld v-if="state !== 'menu' && state !== 'game'" msg="Welcome to Your Vue.js Shmup" />
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
import EnemyShip from '@/components/shmup/foreground/EnemyShip'
import PowerUp from '@/components/shmup/foreground/PowerUp'
import SpecialEffect from '@/components/shmup/foreground/SpecialEffect'

import StartScreen from '@/components/shmup/ui/StartScreen'
import IngameHud from '@/components/shmup/ui/IngameHud'

import DivSprite from '@/components/shmup/DivSprite'

import FakeHelloWorld from '@/components/shmup/FakeHelloWorld'
import Instructions from '@/components/shmup/Instructions'
import Copyright from '@/components/shmup/Copyright'

import { glMatrix } from 'gl-matrix'

import MachineMixin from '@/mixins/MachineMixin'
import KeymapMixin from '@/mixins/KeymapMixin'
import { delay } from '@/utilities'

import { createInitialState, reset, handleInput, update } from '@/components/shmup/game-logic'

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
    EnemyShip,
    PowerUp,
    SpecialEffect,
    StartScreen,
    IngameHud,
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
  eventKeymap: {
    'space' () {
      if (this.state === 'menu') {
        reset(this.gameState)
      }
      this.send('START')
    }
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
      gameState: createInitialState()
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
      if (this.state !== 'game') return

      update(this.gameState, frameTimings)
    }
  },
  watch: {
    'gameState.entities.player.health' (health) {
      if (health <= 0) {
        this.send('DEAD')
      }
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
    &.gameover {
      background-color: rgb(74, 0, 0);
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
