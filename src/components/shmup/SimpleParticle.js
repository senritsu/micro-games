const canvasSize = [400, 600]

export default {
  functional: true,
  props: {
    size: Number,
    position: Array
  },
  render (h, context) {
    const { size, position } = context.props
    return h('div', {
      class: [
        context.data.class,
        'particle'
      ],
      style: {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(${position[0] - size / 2}px, ${canvasSize[1] - position[1] - size / 2}px)`
      }
    })
  }
}
