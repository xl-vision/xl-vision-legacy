import createColors, { Color } from './color'
import createAnimation, { Animation } from './animation'
import createTypography, { Typography } from './typography'

export type Theme = Partial<{
  color: Color
  animation: Animation
  typography: Typography
}>

export default (theme: Theme = {}) => {
  const { color, animation, typography } = theme

  const outputColor = createColors(color)
  const outputAnmiamtion = createAnimation(animation)
  const outputTypography = createTypography(typography)

  return {
    color: outputColor,
    animation: outputAnmiamtion,
    typography: outputTypography
  }
}
