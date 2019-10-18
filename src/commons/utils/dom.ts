import { oneOf } from './array'
import { isServer } from './env'

export const getClasses = (element: HTMLElement) => {
  const classes = (element.className || '').trim()
  return classes.split(/\s+/)
}

export const containClass = (element: HTMLElement, className: string) => {
  return oneOf(getClasses(element), className)
}

export const addClass = (element: HTMLElement, className: string) => {
  if (containClass(element, className)) {
    return
  }
  const _className = (element.className || '') + ` ${className}`
  element.className = _className.replace(/\s+/, ' ').trim()
}

export const removeClass = (element: HTMLElement, className: string) => {
  if (!containClass(element, className)) {
    return
  }
  const _className = (element.className || '').replace(className, ' ')
  element.className = _className.replace(/\s+/, ' ').trim()
}

export const getAbsolutePosition = (el: HTMLElement) => {
  const width = el.offsetWidth
  const height = el.offsetHeight
  let parent = el
  let top = -parent.clientTop
  let left = -parent.clientLeft
  while (parent) {
    const translate = getTranslate(parent)
    top += parent.offsetTop + translate.y
    left += parent.offsetLeft + translate.x
    parent = parent.offsetParent as HTMLElement
  }
  const bottom = top + height
  const right = left + width
  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  }
}

export const getTranslate = (element: HTMLElement) => {
  const transformMatrix =
    getComputedStyle(element, '').getPropertyValue('transform') ||
    getComputedStyle(element, '').getPropertyValue('-webkit-transform') ||
    getComputedStyle(element, '').getPropertyValue('-moz-transform') ||
    getComputedStyle(element, '').getPropertyValue('-ms-transform')

  const matrix = transformMatrix.match(/\-?[0-9]+\.?[0-9]*/g)

  if (!matrix) {
    return {
      x: 0,
      y: 0
    }
  }
  const x = parseInt(matrix[4]) //translate x
  const y = parseInt(matrix[5]) //translate y
  return { x, y }
}

export const include = (parent: Element, child: Element) => {
  let temp: Element | null = child
  while (temp) {
    if (temp === parent) {
      return true
    }
    temp = temp.parentElement
  }
  return false
}

export const isStyleSupport = (styleProperty: string) => {
  if (isServer) {
    return true
  }
  const div = document.createElement('div')
  const styles = div.style
  let result = false
  if (styleProperty in styles) {
    result = true
  } else {
    const vendors = ['o', 'moz', 'webkit']
    for (const prefix of vendors) {
      const prop = prefix + styleProperty.replace(/^[a-z]/, val => val.toUpperCase())
      if (prop in styles) {
        result = true
        break
      }
    }
  }
  return result
}
