<script>
const canvasSize = [400, 600]

export default {
  functional: true,
  props: {
    size: {
      type: Array,
      required: true
    },
    position: {
      type: Array,
      required: true
    }
  },
  render (h, context) {
    const { position, size } = context.props

    const x = position[0]
    const y = canvasSize[1] - position[1]

    return h('div', {
      class: 'sprite-container',
      style: {
        transform: `translate(${x}px, ${y}px)`
      }
    }, [
      h('div', {
        class: 'visual-wrapper',
        style: {
          width: `${size[0]}px`,
          height: `${size[1]}px`
        }
      }, context.children)
    ])
  }
}
</script>

<style lang="scss" scoped>
.sprite-container {
  position: absolute;
  width: 0;
  height: 0;
}
.visual-wrapper {
  transform: translate(-50%, -50%);
}
</style>
