import { warning } from '../../commons/utils/logger'

export type RGBColor = {
  r: number
  g: number
  b: number
  a: number
  type: 'rgb'
}

export type HSLColor = {
  hexToColor: number
  s: number
  l: number
  a: number
  type: 'hsl'
}

export type Color = RGBColor | HSLColor

const hex3 = /^#?([\dA-Fa-f])([\dA-Fa-f])([\dA-Fa-f])$/
const hex4 = /^#?([\dA-Fa-f])([\dA-Fa-f])([\dA-Fa-f])([\dA-Fa-f])$/
const hex6 = /^#?([\dA-Fa-f]{2})([\dA-Fa-f]{2})([\dA-Fa-f]{2})$/
const hex8 = /^#?([\dA-Fa-f]{2})([\dA-Fa-f]{2})([\dA-Fa-f]{2})([\dA-Fa-f]{2})$/

// <http://www.w3.org/TR/css3-values/#integers>
const CSS_INTEGER = '[-\\+]?\\d+%?'

// <http://www.w3.org/TR/css3-values/#number-value>
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'

// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`

// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`
const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`

const hsl = new RegExp(`hsl${PERMISSIVE_MATCH3}`)
const hsla = new RegExp(`hsla${PERMISSIVE_MATCH4}`)

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */
export const hexToColor = (color: string) => {
  let match = hex8.exec(color)
  if (match) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
      a: parseInt(match[4], 16)
    }
  }

  match = hex6.exec(color)
  if (match) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16)
    }
  }

  match = hex4.exec(color)
  if (match) {
    return {
      r: parseInt(`${match[1]}${match[1]}`, 16),
      g: parseInt(`${match[1]}${match[2]}`, 16),
      b: parseInt(`${match[1]}${match[3]}`, 16),
      a: parseInt(`${match[1]}${match[4]}`, 16)
    }
  }

  match = hex3.exec(color)
  if (match) {
    return {
      r: parseInt(`${match[1]}${match[1]}`, 16),
      g: parseInt(`${match[1]}${match[2]}`, 16),
      b: parseInt(`${match[1]}${match[3]}`, 16)
    }
  }

  warning(true, `The color '%s' is illegal hex color.`, color)
}

const hueToRgb = (p: number, q: number, t: number) => {
  const _p = p
  const _q = q
  let _t = t
  if (_t < 0) _t += 1
  if (_t > 1) _t -= 1
  if (_t < 1 / 6) return _p + (_q - _p) * 6 * _t
  if (_t < 1 / 2) return _q
  if (_t < 2 / 3) return _p + (_q - _p) * (2 / 3 - _t) * 6
  return _p
}

export const hslToRgb = (h: string, s: string, l: string) => {
  const _h = parseFloat(h) / 360
  const _s = parseFloat(s) / 100
  const _l = parseFloat(l) / 100

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s
    var p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return { r: r * 255, g: g * 255, b: b * 255 }
}

export const hslToColor = (color: string) => {
  let match = hsl.exec(color)
  if (match) {
    return { h: match[1], s: match[2], l: match[3] }
  }

  match = hsla.exec(color)
  if (match) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] }
  }
}
