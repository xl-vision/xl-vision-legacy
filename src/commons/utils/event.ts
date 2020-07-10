import { EventHandler, SyntheticEvent } from 'react'
import { isServer } from './env'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Listener<K extends keyof WindowEventMap> = (this: Window, ev: WindowEventMap[K], options?: boolean | AddEventListenerOptions) => any

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

export const mergeNativeEvents = <K extends keyof WindowEventMap>(...listeners: Array<Listener<K> | undefined>) => {
  return function listener(this: Window, e: WindowEventMap[K], options?: boolean | EventListenerOptions) {
    listeners.forEach((it) => {
      if (it) {
        it.call(this, e, options)
      }
    })
  }
}

export const mergeEvents = <E extends SyntheticEvent<any>>(...handlers: Array<EventHandler<E> | undefined>) => {
  return (e: E) => {
    handlers.forEach((it) => {
      if (it) {
        it(e)
      }
    })
  }
}


