export const isClient = typeof window === 'object'

export const on = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  if (!isClient) {
    return
  }
  window.addEventListener(type, listener, options)
}

export const off = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | EventListenerOptions
) => {
  if (!isClient) {
    return
  }
  window.removeEventListener(type, listener, options)
}
