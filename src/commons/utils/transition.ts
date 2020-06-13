import { isBrowser } from './env'
import { voidFn } from './function'

let transitionProp = 'transition'
let transitionEndEvent = 'transitionend'
let animationProp = 'animation'
let animationEndEvent = 'animationend'

if (isBrowser) {
  if (
    window.ontransitionend === undefined &&
    (window as { onwebkittransitionend?: Function }).onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition'
    transitionEndEvent = 'webkitTransitionEnd'
  }
  if (
    window.onanimationend === undefined &&
    (window as { onwebkitanimationend?: Function }).onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation'
    animationEndEvent = 'webkitAnimationEnd'
  }
}

export const onTransitionEnd = (el: HTMLElement, done: () => void) => {
  const styles = (getComputedStyle(el) as unknown) as { [key: string]: string }
  const transitionDelays: Array<string> = (styles[`${transitionProp}Delay`] || '').split(', ')
  const transitionDurations: Array<string> = (styles[`${transitionProp}Duration`] || '').split(', ')
  const animationDelays: Array<string> = (styles[`${animationProp}Delay`] || '').split(', ')
  const animationDurations: Array<string> = (styles[`${animationProp}Duration`] || '').split(', ')
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
    done()
    return voidFn
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

  const id = setTimeout(() => {
    if (count < eventCount) {
      end()
    }
  }, timeout + 1)

  el.addEventListener(event, onEnd)
  return () => {
    clearTimeout(id)
    el.removeEventListener(event, onEnd)
  }
}

const getTimeout = (delays: Array<string>, durations: Array<string>) => {
  while (delays.length < durations.length) {
    delays = delays.concat(delays)
  }

  return Math.max.apply(
    null,
    durations.map((d, i) => {
      return toMs(d) + toMs(delays[i])
    })
  )
}

const toMs = (s: string) => {
  return Number(s.slice(0, -1)) * 1000
}

export const raf = isBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : (fn: Function) => fn()

export const nextFrame = (fn: Function) => {
  raf(() => {
    raf(fn)
  })
}
