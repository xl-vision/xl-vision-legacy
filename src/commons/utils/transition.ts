import { isBrowser } from './env'
import { voidFn } from './function'

let TRANSITION_NAME = 'transition'
let ANIMATION_NAME = 'animation'

if (isBrowser) {
  if (!('ontransitionend' in window) && 'onwebkittransitionend' in window) {
    TRANSITION_NAME = 'webkitTransition'
  }
  if (!('onanimationend' in window) && 'onwebkitanimationend' in window) {
    ANIMATION_NAME = 'webkitAnimation'
  }
}

export const getTransitionInfo = (el: HTMLElement) => {
  const styles = getComputedStyle(el)

  const getStyleProperties = (
    key: 'transitionDelay' | 'transitionDuration' | 'animationDelay' | 'animationDuration'
  ) => styles[key].split(', ')

  const transitionDelays = getStyleProperties(`${TRANSITION_NAME}Delay` as 'transitionDelay')
  const transitionDurations = getStyleProperties(
    `${TRANSITION_NAME}Duration` as 'transitionDuration'
  )
  const transitionTimeout: number = _getTimeout(transitionDelays, transitionDurations)

  const animationDelays = getStyleProperties(`${ANIMATION_NAME}Delay` as 'animationDelay')
  const animationDurations = getStyleProperties(`${ANIMATION_NAME}Duration` as 'animationDuration')
  const animationTimeout: number = _getTimeout(animationDelays, animationDurations)

  const timeout = Math.max(transitionTimeout, animationTimeout)

  const type =
    timeout > 0 ? (transitionTimeout > animationTimeout ? TRANSITION_NAME : ANIMATION_NAME) : null
  const durationCount = type
    ? type === TRANSITION_NAME
      ? transitionDurations.length
      : animationDurations.length
    : 0

  const hasTransform =
    type === TRANSITION_NAME &&
    /\b(transform|all)(,|$)/.test(styles[`${TRANSITION_NAME}Property` as 'transitionProperty'])

  return {
    type,
    timeout,
    durationCount,
    hasTransform
  }
}

export const onTransitionEnd = (el: HTMLElement, done: () => void) => {
  const { timeout, durationCount, type } = getTransitionInfo(el)

  if (timeout <= 0) {
    done()
    return voidFn
  }

  const eventName = `${type!}end`

  let count = 0

  const end = () => {
    cancelCb()
    done()
  }

  const onEnd = (e: Event) => {
    if (e.target !== el) {
      return
    }
    if (++count >= durationCount) {
      end()
    }
  }

  const id = setTimeout(() => {
    if (count < durationCount) {
      end()
    }
  }, timeout + 1)

  el.addEventListener(eventName, onEnd)
  const cancelCb = () => {
    clearTimeout(id)
    el.removeEventListener(eventName, onEnd)
  }

  return cancelCb
}

export const raf: (cb: () => void) => void = isBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : (fn) => fn()

export const nextFrame = (fn: () => void) => {
  raf(() => {
    raf(fn)
  })
}

export const reflow = () => {
  if (isBrowser) {
    // eslint-disable-next-line no-unused-expressions
    document.body.scrollHeight
  }
}

const _getTimeout = (delays: Array<string>, durations: Array<string>) => {
  while (delays.length < durations.length) {
    delays = delays.concat(delays)
  }

  return Math.max(
    ...durations.map((d, i) => {
      return _toMs(d) + _toMs(delays[i])
    })
  )
}

const _toMs = (s: string) => {
  return Number(s.slice(0, -1)) * 1000
}
