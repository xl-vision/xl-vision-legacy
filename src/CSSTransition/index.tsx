import PropTypes from 'prop-types'
import React from 'react'
import { addClass, removeClass } from '../commons/utils/class'
import { nextFrame, onTransitionEnd } from '../commons/utils/transition'
import Transition, {
  AfterEventHook,
  BeforeEventHook,
  EventCancelledHook,
  EventHook,
  TransitionProps
} from '../Transition'

export type CSSTransitionClassesObject = {
  appear?: string
  appearActive?: string
  appearTo?: string
  enter?: string
  enterActive?: string
  enterTo?: string
  leave?: string
  leaveActive?: string
  leaveTo?: string
  disappear?: string
  disappearActive?: string
  disappearTo?: string
}

export type CSSTransitionClasses = CSSTransitionClassesObject | string

export interface CSSTransitionProps extends TransitionProps {
  disableCss?: boolean
  transitionClasses?: CSSTransitionClasses
  timeout?:
    | number
    | {
        appear?: number
        enter?: number
        leave?: number
        disappear?: number
      }
  forceDisplay?: boolean
}

export type TransitionElement = HTMLElement & {
  _ctc?: CSSTransitionClassesObject
  _done?: (cancel?: boolean) => void
  _cancelled?: boolean
  _originalDisplay?: string
}

const CSSTransition: React.FunctionComponent<CSSTransitionProps> = (props) => {
  const {
    disableCss,
    transitionClasses,
    beforeEnter,
    enter,
    afterEnter,
    enterCancelled,
    beforeLeave,
    leave,
    afterLeave,
    leaveCancelled,
    timeout,
    forceDisplay,
    ...others
  } = props

  let {
    beforeAppear,
    appear,
    appearCancelled,
    afterAppear,
    beforeDisappear,
    disappear,
    afterDisappear,
    disappearCancelled
  } = props

  // 如果开启transitionOnFirst,默认使用enter和leave的生命周期方法
  beforeAppear = beforeAppear || beforeEnter
  appear = appear || enter
  afterAppear = afterAppear || afterEnter
  appearCancelled = appearCancelled || enterCancelled

  beforeDisappear = beforeDisappear || beforeLeave
  disappear = disappear || leave
  afterDisappear = afterDisappear || afterLeave
  disappearCancelled = disappearCancelled || leaveCancelled

  const transitionClassesObj = React.useMemo(() => {
    if (!transitionClasses) {
      return {}
    }
    if (typeof transitionClasses === 'object') {
      return transitionClasses
    }
    return {
      appear: `${transitionClasses}-appear`,
      appearActive: `${transitionClasses}-appear-active`,
      appearTo: `${transitionClasses}-appear-to`,
      enter: `${transitionClasses}-enter`,
      enterActive: `${transitionClasses}-enter-active`,
      enterTo: `${transitionClasses}-enter-to`,
      leave: `${transitionClasses}-leave`,
      leaveActive: `${transitionClasses}-leave-active`,
      leaveTo: `${transitionClasses}-leave-to`,
      disappear: `${transitionClasses}-disappear`,
      disappearActive: `${transitionClasses}-disappear-active`,
      disappearTo: `${transitionClasses}-disappear-to`
    }
  }, [transitionClasses])

  const timeoutMap = React.useMemo(() => {
    if (!timeout) {
      return {}
    }
    if (typeof timeout === 'object') {
      return timeout
    }
    return {
      appear: timeout,
      enter: timeout,
      leave: timeout,
      disappear: timeout
    }
  }, [timeout])

  const beforeAppearWrapper = React.useMemo(
    () =>
      createBeforeEventHook(
        !disableCss && {
          appear: transitionClassesObj.appear,
          appearActive: transitionClassesObj.appearActive
        },
        beforeAppear,
        !forceDisplay
      ),
    [disableCss, transitionClassesObj, beforeAppear,forceDisplay]
  )

  const appearWrapper = React.useMemo(
    () =>
      createEventHook(
        ['appear'],
        !disableCss && {
          appearTo: transitionClassesObj.appearTo
        },
        timeoutMap.appear,
        appear
      ),
    [disableCss, transitionClassesObj, timeoutMap, appear]
  )
  const afterAppearWrapper = React.useMemo(() => createAfterEventHook(afterAppear), [afterAppear])
  const appearCancelledWrapper = React.useMemo(() => createEventCancelledHook(appearCancelled), [
    appearCancelled
  ])

  const beforeEnterWrapper = React.useMemo(
    () =>
      createBeforeEventHook(
        !disableCss && {
          enter: transitionClassesObj.enter,
          enterActive: transitionClassesObj.enterActive
        },
        beforeEnter,
        !forceDisplay
      ),
    [disableCss, transitionClassesObj, beforeEnter, forceDisplay]
  )

  const enterWrapper = React.useMemo(
    () =>
      createEventHook(
        ['enter'],
        !disableCss && {
          enterTo: transitionClassesObj.enterTo
        },
        timeoutMap.enter,
        enter
      ),
    [disableCss, transitionClassesObj, timeoutMap, enter]
  )
  const afterEnterWrapper = React.useMemo(() => createAfterEventHook(afterEnter), [afterEnter])
  const enterCancelledWrapper = React.useMemo(() => createEventCancelledHook(enterCancelled), [
    enterCancelled
  ])

  const beforeLeaveWrapper = React.useMemo(
    () =>
      createBeforeEventHook(
        !disableCss && {
          leave: transitionClassesObj.leave,
          leaveActive: transitionClassesObj.leaveActive
        },
        beforeLeave
      ),
    [disableCss, transitionClassesObj, beforeLeave]
  )

  const leaveWrapper = React.useMemo(
    () =>
      createEventHook(
        ['leave'],
        !disableCss && {
          leaveTo: transitionClassesObj.leaveTo
        },
        timeoutMap.leave,
        leave
      ),
    [disableCss, transitionClassesObj, timeoutMap, leave]
  )
  const afterLeaveWrapper = React.useMemo(() => createAfterEventHook(afterLeave), [afterLeave])
  const leaveCancelledWrapper = React.useMemo(() => createEventCancelledHook(leaveCancelled), [
    leaveCancelled
  ])

  const beforeDisappearWrapper = React.useMemo(
    () =>
      createBeforeEventHook(
        !disableCss && {
          disappear: transitionClassesObj.disappear,
          disappearActive: transitionClassesObj.disappearActive
        },
        beforeDisappear
      ),
    [disableCss, transitionClassesObj, beforeDisappear]
  )

  const disappearWrapper = React.useMemo(
    () =>
      createEventHook(
        ['disappear'],
        !disableCss && {
          disappearTo: transitionClassesObj.disappearTo
        },
        timeoutMap.disappear,
        disappear
      ),
    [disableCss, transitionClassesObj, timeoutMap, disappear]
  )
  const afterDisappearWrapper = React.useMemo(() => createAfterEventHook(afterDisappear), [
    afterDisappear
  ])
  const disappearCancelledWrapper = React.useMemo(
    () => createEventCancelledHook(disappearCancelled),
    [disappearCancelled]
  )

  return (
    <Transition
      {...others}
      beforeAppear={beforeAppearWrapper}
      appear={appearWrapper}
      afterAppear={afterAppearWrapper}
      appearCancelled={appearCancelledWrapper}
      beforeEnter={beforeEnterWrapper}
      enter={enterWrapper}
      afterEnter={afterEnterWrapper}
      enterCancelled={enterCancelledWrapper}
      beforeLeave={beforeLeaveWrapper}
      leave={leaveWrapper}
      afterLeave={afterLeaveWrapper}
      leaveCancelled={leaveCancelledWrapper}
      beforeDisappear={beforeDisappearWrapper}
      disappear={disappearWrapper}
      afterDisappear={afterDisappearWrapper}
      disappearCancelled={disappearCancelledWrapper}
    />
  )
}

CSSTransition.displayName = 'CSSTransition'

CSSTransition.propTypes = {
  transitionClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  disableCss: PropTypes.bool,
  beforeAppear: PropTypes.func,
  appear: PropTypes.func,
  afterAppear: PropTypes.func,
  appearCancelled: PropTypes.func,
  beforeEnter: PropTypes.func,
  enter: PropTypes.func,
  afterEnter: PropTypes.func,
  enterCancelled: PropTypes.func,
  beforeLeave: PropTypes.func,
  leave: PropTypes.func,
  afterLeave: PropTypes.func,
  leaveCancelled: PropTypes.func,
  beforeDisappear: PropTypes.func,
  disappear: PropTypes.func,
  afterDisappear: PropTypes.func,
  disappearCancelled: PropTypes.func,
  forceDisplay: PropTypes.bool
}

export default CSSTransition

const createBeforeEventHook = (
  ctc: CSSTransitionClassesObject | false,
  nativeHook?: BeforeEventHook,
  displayNone?: boolean
): BeforeEventHook => {
  return (el: TransitionElement) => {
    // 在ie11下，enter时如果不diplay=none，会导致行为和chrome不一致
    if (!el._cancelled && displayNone) {
      el._originalDisplay = el.style.display
      el.style.display = 'none'
    }

    // for TransitionGroup
    el._ctc = {}
    if (ctc) {
      Object.keys(ctc).forEach((key: keyof CSSTransitionClassesObject) => {
        const clazz = ctc[key]
        if (clazz) {
          addClass(el, clazz)
          el._ctc![key] = clazz
        }
      })
    }
    nativeHook && nativeHook(el)

    el._cancelled = false

    if (el._originalDisplay !== undefined) {
      el.style.display = el._originalDisplay
      el._originalDisplay = undefined
    }
  }
}

const createEventHook = (
  removedClassNames: Array<keyof CSSTransitionClassesObject>,
  ctc: CSSTransitionClassesObject | false,
  timeout?: number,
  nativeHook?: EventHook
): EventHook => {
  return (el: TransitionElement, done: () => void, isCancelled: () => boolean) => {
    let isInterrupt = false
    let cancelEvent: () => void
    let timeoutId: NodeJS.Timeout

    const doneCb = () => {
      el._done = undefined
      done()
    }

    nextFrame(() => {
      // 被用户强制中断
      if (isInterrupt) {
        return
      }
      if (!isCancelled()) {
        removedClassNames.forEach((name) => {
          const clazz = el._ctc![name]
          if (clazz) {
            removeClass(el, clazz)
            delete el._ctc![name]
          }
        })
        if (ctc) {
          Object.keys(ctc).forEach((key: keyof CSSTransitionClassesObject) => {
            const clazz = ctc[key]
            if (clazz) {
              addClass(el, clazz)
              el._ctc![key] = clazz
            }
          })
        }
        if (timeout && timeout > 0) {
          timeoutId = setTimeout(doneCb, timeout)
        } else {
          cancelEvent = onTransitionEnd(el, doneCb)
        }
      }
    })
    nativeHook && nativeHook(el, doneCb, isCancelled)

    el._done = (cancel) => {
      isInterrupt = true
      // 清除事件
      cancelEvent && cancelEvent()
      clearTimeout(timeoutId)

      if (!cancel) {
        doneCb()
      }
    }
  }
}

const createAfterEventHook = (nativeHook?: AfterEventHook): AfterEventHook => {
  return (el: TransitionElement) => {
    Object.keys(el._ctc!).forEach((key: keyof CSSTransitionClassesObject) => {
      const clazz = el._ctc![key]
      clazz && removeClass(el, clazz)
      delete el._ctc![key]
    })
    el._ctc = undefined
    nativeHook && nativeHook(el)
  }
}

const createEventCancelledHook = (nativeHook?: EventCancelledHook): EventCancelledHook => {
  return (el: TransitionElement) => {
    // 清除所有事件
    el._done && el._done(true)
    Object.keys(el._ctc || {}).forEach((key: keyof CSSTransitionClassesObject) => {
      const clazz = el._ctc![key]
      clazz && removeClass(el, clazz)
      delete el._ctc![key]
    })
    el._ctc = undefined

    el._cancelled = true

    nativeHook && nativeHook(el)
  }
}
