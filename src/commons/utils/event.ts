import { isServer } from './env'

export const on = <K extends keyof WindowEventMap>(
  type: K,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  if (isServer) {
    return
  }
  window.addEventListener(type, listener, options)
}

export const off = <K extends keyof WindowEventMap>(
  type: K,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | EventListenerOptions
) => {
  if (isServer) {
    return
  }
  window.removeEventListener(type, listener, options)
}

export const mergeEvents = <K extends keyof WindowEventMap>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...listeners: ((this: Window, ev: WindowEventMap[K]) => any)[]
) => {
  return function(this: Window, ev: WindowEventMap[K]) {
    for (const listener of listeners) {
      if (listener) {
        listener.apply(this, ev)
      }
    }
  }
}
