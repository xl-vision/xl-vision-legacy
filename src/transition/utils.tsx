import { ProxyElement } from '.'

export const proxyElement = (el: HTMLElement, isWriteable: () => boolean): ProxyElement => {
  const setHandler = (target: any, prop: PropertyKey, value: any, _receiver?: any) => {
    if (isWriteable()) {
      target[prop] = value
    }
    return true
  }

  const getHandler = (target: any, prop: PropertyKey, _receiver?: any) => {
    return target[prop]
  }

  const style = new Proxy(el.style, {
    get: getHandler,
    set: setHandler
  })
  const classList = new Proxy(el.classList,{
    get: getHandler,
    set: setHandler
  })

  return new Proxy(el, {
    get: (target, prop, _receiver) => {
      if (prop === 'target') {
        return target
      }
      if (prop === 'style') {
        return style
      }
      if (prop === 'classList') {
        return classList
      }
      return getHandler(target, prop, target)
    },
    set: setHandler
  })
}
