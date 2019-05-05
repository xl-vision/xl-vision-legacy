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

export const addClass = (dom: HTMLElement, classToAdd: string) => {
  const src = dom.className.split(/ +/)
  const clazz = classToAdd.trim()
  if (src.includes(clazz)) {
    return
  }
  src.push(clazz)
  dom.className = src.join(' ')
}

export const removeClass = (dom: HTMLElement, classToAdd: string) => {
  let src = dom.className.split(/ +/)
  const clazz = classToAdd.trim()
  if (!src.includes(clazz)) {
    return
  }
  src = src.slice(0, src.indexOf(clazz)).concat(src.slice(src.indexOf(clazz) + 1))
  dom.className = src.join(' ')
}
