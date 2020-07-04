import { isBrowser } from './env'
import { voidFn } from './function'

let TRANSITION_NAME = 'transition'
let ANIMATION_NAME = 'animation'

if (isBrowser) {
  if (
    window.ontransitionend === undefined &&
    (window as { onwebkittransitionend?: Function }).onwebkittransitionend !== undefined
  ) {
    TRANSITION_NAME = 'WebkitTransition'
  }
  if (
    window.onanimationend === undefined &&
    (window as { onwebkitanimationend?: Function }).onwebkitanimationend !== undefined
  ) {
    ANIMATION_NAME = 'WebkitAnimation'
  }
}

export const getTransitionInfo = (el: HTMLElement) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const styles: any = getComputedStyle(el)

  const getStyleProperties = (key: string) => (styles[key] || '').split(', ')

  const transitionDelays = getStyleProperties(TRANSITION_NAME + 'Delay')
  const transitionDurations = getStyleProperties(TRANSITION_NAME + 'Duration')
  const transitionTimeout: number = _getTimeout(transitionDelays, transitionDurations)

  const animationDelays = getStyleProperties(ANIMATION_NAME + 'Delay')
  const animationDurations = getStyleProperties(ANIMATION_NAME + 'Duration')
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
    type === TRANSITION_NAME && /\b(transform|all)(,|$)/.test(styles[TRANSITION_NAME + 'Property'])

  return {
    type,
    timeout,
    durationCount,
    hasTransform
  }
}

export const onTransitionEnd = (el: HTMLElement, done: () => void) => {
  const { timeout, durationCount, type } = getTransitionInfo(el)

  const eventName = type + 'end'

  if (timeout <= 0) {
    done()
    return voidFn
  }

  let count = 0

  const end = () => {
    el.removeEventListener(eventName, onEnd)
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
  return () => {
    clearTimeout(id)
    el.removeEventListener(eventName, onEnd)
  }
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
