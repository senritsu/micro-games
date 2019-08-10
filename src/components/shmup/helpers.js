import Chance from 'chance'
import { vec2 } from 'gl-matrix'

export const chance = new Chance()

export const directionFromKeys = keys => {
  let v = vec2.create()

  if (keys.left && !keys.right) {
    vec2.add(v, v, [-1, 0])
  }
  if (!keys.left && keys.right) {
    vec2.add(v, v, [1, 0])
  }
  if (keys.up && !keys.down) {
    vec2.add(v, v, [0, 1])
  }
  if (!keys.up && keys.down) {
    vec2.add(v, v, [0, -1])
  }

  return v
}
