<template lang="html">
  <ParallaxScroller :scroll-speed="scrollSpeed">
    <SimpleParticle
      v-for="(mote, i) in motes"
      :key="i"
      v-bind="mote"
    />
  </ParallaxScroller>
</template>

<script>
import { chance } from '@/components/shmup/helpers'

import ParallaxScroller from '@/components/shmup/ParallaxScroller'
import SimpleParticle from '@/components/shmup/SimpleParticle'

export default {
  components: {
    ParallaxScroller,
    SimpleParticle
  },
  props: {
    count: {
      type: Number,
      required: true
    },
    scrollSpeed: Number,
    size: Array
  },
  computed: {
    motes () {
      const factor = this.size[1] - this.size[0]

      return new Array(this.count).fill(null).map(() => ({
        size: this.size[0] + factor * chance.normal(),
        position: [
          chance.integer({ min: 0, max: 400 }),
          chance.integer({ min: 0, max: 900 })
        ]
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
