import createColors, { Color } from './color'
import createAnimation, { Animation } from './animation'
import createTypography, { Typography } from './typography'
import createMixins from './mixins'

export type Theme = Partial<{
  color: Color
  animation: Animation
  typography: Typography
  span: number
}>

export default (theme: Theme = {}) => {
  const { color, animation, typography, span = 24 } = theme

  const outputColor = createColors(color)
  const outputAnimation = createAnimation(animation)
  const outputTypography = createTypography(typography)

  const mixins = createMixins()

  return {
    color: outputColor,
    animation: outputAnimation,
    typography: outputTypography,
    mixins,
    span
  }
}
