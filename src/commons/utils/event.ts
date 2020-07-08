import { isServer } from './env'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Listener<K extends keyof WindowEventMap> = (this: Window, ev: WindowEventMap[K]) => any

export const on = <K extends keyof WindowEventMap>(
  type: K,
  listener: Listener<K>,
  options?: boolean | AddEventListenerOptions
) => {
  if (isServer) {
    return
  }
  window.addEventListener(type, listener, options)
}

export const off = <K extends keyof WindowEventMap>(
  type: K,
  listener: Listener<K>,
  options?: boolean | EventListenerOptions
) => {
  if (isServer) {
    return
  }
  window.removeEventListener(type, listener, options)
}

export const mergeEvents = <K extends keyof WindowEventMap>(...listeners: Array<Listener<K>>) => {
  return function (this: Window, ev: WindowEventMap[K]) {
    for (const listener of listeners) {
      if (listener) {
        listener.apply(this, ev)
      }
    }
  }
}
