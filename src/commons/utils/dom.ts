import { oneOf } from './array'

export const isClient = typeof window === 'object'

export const isServer = !isClient

export const on = <K extends keyof WindowEventMap> (
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  if (!isClient) {
    return
  }
  window.addEventListener(type, listener, options)
}

export const off = <K extends keyof WindowEventMap> (
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | EventListenerOptions
) => {
  if (!isClient) {
    return
  }
  window.removeEventListener(type, listener, options)
}

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
  element.className = _className.replace(/\s+/, ' ')
}

export const removeClass = (element: HTMLElement, className: string) => {
  if (!containClass(element, className)) {
    return
  }
  const _className = (element.className || '').replace(className, ' ')
  element.className = _className.replace(/\s+/, ' ')
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
