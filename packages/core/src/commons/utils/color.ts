export type RGBColor = {
  r: number
  g: number
  b: number
  a?: number
}

export type HSLColor = {
  h: number
  s: number
  l: number
  a?: number
}

export type Color = RGBColor | HSLColor

const hexToColor: (color: string) => Color = (color) => {
  const parsedColor = color.substring(1)

  const re = new RegExp(`.{1,${parsedColor.length >= 6 ? 2 : 1}}`, 'g')
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  let colors: Array<string> | RegExpMatchArray | null = parsedColor.match(re)

  if (!colors || colors.length < 3) {
    throw new Error(`The color '${color}' is illegal hex color`)
  }

  if (colors[0].length === 1) {
    colors = colors.map((n) => n + n)
  }

  const rgbColor: RGBColor = {
    r: parseInt(colors[0], 16),
    g: parseInt(colors[1], 16),
    b: parseInt(colors[2], 16)
  }

  if (colors.length > 3) {
    rgbColor.a = parseInt(colors[3], 16) / 255
  }
  return rgbColor
}

const rgbToColor: (color: string) => Color = (color) => {
  const matcher = color.indexOf('(')
  if (matcher === -1) {
    throw new Error(`The color '${color}' is illegal rgb color`)
  }

  const values = color.substring(matcher + 1, color.length - 1).split(',')

  if (values.length < 3) {
    throw new Error(`The color '${color}' is illegal rgb color`)
  }

  const rgbColor: RGBColor = {
    r: parseInt(values[0], 10),
    g: parseInt(values[1], 10),
    b: parseInt(values[2], 10)
  }

  if (values.length > 3) {
    rgbColor.a = parseFloat(values[3])
  }
  return rgbColor
}

const hslToColor: (color: string) => Color = (color) => {
  const matcher = color.indexOf('(')
  if (matcher === -1) {
    throw new Error(`The color '${color}' is illegal hsl color`)
  }

  const values = color.substring(matcher + 1, color.length - 1).split(',')

  if (values.length < 3) {
    throw new Error(`The color '${color}' is illegal hsl color`)
  }

  const hslColor: HSLColor = {
    h: parseInt(values[0], 10),
    s: parseFloat(values[1]),
    l: parseFloat(values[2])
  }

  if (values.length > 3) {
    hslColor.a = parseFloat(values[3])
  }
  return hslColor
}

const hue2rgb = (p: number, q: number, t: number) => {
  // eslint-disable-next-line no-param-reassign
  if (t < 0) t += 1
  // eslint-disable-next-line no-param-reassign
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

const hslColorToRgbColor: (color: HSLColor) => RGBColor = (color) => {
  let { h, s, l } = color
  h /= 360
  s /= 100
  l /= 100
  let r = 0
  let g = 0
  let b = 0
  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  const rgbColor: RGBColor = {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: color.a
  }

  return rgbColor
}

const toColor: (color: string | Color) => Color = (color) => {
  if (typeof color === 'object') {
    return color
  }
  const parsedColor = color.trim()
  if (parsedColor.startsWith('#')) {
    return hexToColor(parsedColor)
  }
  if (parsedColor.startsWith('rgb')) {
    return rgbToColor(parsedColor)
  }
  if (parsedColor.startsWith('hsl')) {
    return hslToColor(parsedColor)
  }
  throw new Error(`The color '${color}' is not supported.`)
}

const toRgbColor: (color: string | Color) => RGBColor = (color) => {
  const obj = toColor(color)
  if ('r' in obj) {
    return obj
  }
  return hslColorToRgbColor(obj)
}

const colorToRgb: (color: Color) => string = (color) => {
  const rgb = toRgbColor(color)
  return `rgb${rgb.a ? 'a' : ''}(${rgb.r},${rgb.g},${rgb.b}${rgb.a ? `,${rgb.a}` : ''})`
}

const rgbNormalize = (val: number) => {
  val /= 255
  return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4
}

export const getLuminance = (color: string) => {
  let { r, g, b } = toRgbColor(color)

  r = rgbNormalize(r)
  g = rgbNormalize(g)
  b = rgbNormalize(b)

  // Truncate at 3 digits
  return Number((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3))
}

export const getContrastRatio = (foreground: string, background: string) => {
  const lumA = getLuminance(foreground)
  const lumB = getLuminance(background)
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05)
}

export const mix = (color1: string, color2: string, amount = 0.5) => {
  const { r: r1, g: g1, b: b1, a: a1 = 1 } = toRgbColor(color1)
  const { r: r2, g: g2, b: b2, a: a2 = 1 } = toRgbColor(color2)

  const rgbColor: RGBColor = {
    r: (r1 - r2) * amount + r2,
    g: (g1 - g2) * amount + g2,
    b: (b1 - b2) * amount + b2,
    a: (a1 - a2) * amount + a2
  }

  return colorToRgb(rgbColor)
}
