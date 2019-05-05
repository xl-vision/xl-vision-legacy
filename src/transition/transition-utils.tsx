export const proxyElement = (el: HTMLElement, isWriteable: () => boolean) => {
  const setHandler = (target: any, prop: PropertyKey, value: any, _receiver: any) => {
    if (isWriteable()) {
      target[prop as any] = value
    }
    return true
  }
  const style = new Proxy(el.style, {
    set: setHandler
  })
  const classList = new Proxy(el.classList,{
    set: setHandler
  })

  return new Proxy(el, {
    get: (target, prop, _receiver) => {
      if (prop === 'style') {
        return style
      }
      if (prop === 'classList') {
        return classList
      }
      // @ts-ignore
      return target[prop]
    },
    set: (target: any, prop: PropertyKey, value: any, _receiver: any) => {
      if (isWriteable()) {
        if (prop === 'className') {
          target[prop] = value
        } else {
          target[prop as any] = value
        }
      }
      return true
    }
  })
}
