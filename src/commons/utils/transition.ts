import { isClient } from './env'

let transitionProp = 'transition'
let transitionEndEvent = 'transitionend'
let animationProp = 'animation'
let animationEndEvent = 'animationend'

if (isClient) {
  if (window.ontransitionend === undefined &&
    // @ts-ignore
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition'
    transitionEndEvent = 'webkitTransitionEnd'
  }
  if (window.onanimationend === undefined &&
    // @ts-ignore
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation'
    animationEndEvent = 'webkitAnimationEnd'
  }
}

export const onTransitionEnd = (el: HTMLElement, done: () => void) => {
  const styles = getComputedStyle(el)
  // @ts-ignore
  const transitionDelays: string[] = (styles[`${transitionProp}Delay`] || '').split(', ')
  // @ts-ignore
  const transitionDurations: string[] = (styles[`${transitionProp}Duration`] || '').split(', ')
  // @ts-ignore
  const animationDelays: string[] = (styles[`${animationProp}Delay`] || '').split(', ')
  // @ts-ignore
  const animationDurations: string[] = (styles[`${animationProp}Duration`] || '').split(', ')
  const transitionTimeout: number = getTimeout(transitionDelays, transitionDurations)
  const animationTimeout: number = getTimeout(animationDelays, animationDurations)
  let event = transitionEndEvent
  let timeout = transitionTimeout
  let eventCount = transitionDurations.length

  if (timeout < animationTimeout) {
    event = animationEndEvent
    timeout = animationTimeout
    eventCount = animationDurations.length
  }

  if (timeout <= 0) {
    return done()
  }

  let count = 0

  const end = () => {
    el.removeEventListener(event, onEnd)
    done()
  }

  const onEnd = (e: Event) => {
    if (e.target !== el) {
      return
    }
    if (++count >= eventCount) {
      end()
    }
  }

  setTimeout(() => {
    if (count < eventCount) {
      end()
    }
  }, timeout + 1)

  el.addEventListener(event, onEnd)
}

const getTimeout = (delays: string[], durations: string[]) => {
  while (delays.length < durations.length) {
    delays = delays.concat(delays)
  }

  return Math.max.apply(null, durations.map((d, i) => {
    return toMs(d) + toMs(delays[i])
  }))
}

const toMs = (s: string) => {
  return Number(s.slice(0, -1)) * 1000
}

const raf = isClient ?
  window.requestAnimationFrame ?
    window.requestAnimationFrame.bind(window)
    : setTimeout
  : (fn: Function) => fn()

export const nextFrame = (fn: Function) => {
  raf(() => {
    raf(fn)
  })
}
