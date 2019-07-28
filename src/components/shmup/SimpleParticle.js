export default {
  functional: true,
  props: {
    size: Number,
    position: Array
  },
  render (h, context) {
    const { size, position } = context.props
    return h('div', {
      class: 'particle',
      style: {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(${position[0]}px, ${position[1]}px)`
      }
    })
  }
}
