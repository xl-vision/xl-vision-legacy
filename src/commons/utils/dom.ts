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

export const getPosition = (el: HTMLElement) => {
  let top = 0
  let left = 0
  let parent = el
  while (parent) {
    top += parent.offsetTop
    left += parent.offsetLeft
    parent = parent.offsetParent as HTMLElement
  }
  const right = left + el.offsetWidth
  const bottom = top + el.offsetHeight
  return {
    bottom,
    left,
    right,
    top
  }
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
