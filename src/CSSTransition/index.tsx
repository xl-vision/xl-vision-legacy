import PropTypes from 'prop-types'
import React from 'react'
import { addClass, removeClass } from '../commons/utils/class'
import { nextFrame, onTransitionEnd } from '../commons/utils/transition'
import Transition, {
  TransitionProps,
  BeforeEventHook,
  EventHook,
  AfterEventHook,
  EventCancelledHook
} from '../Transition'

export type CSSTransitionClassNamesObject = {
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

export type CSSTransitionClassNames = CSSTransitionClassNamesObject | string

export interface CSSTransitionProps extends TransitionProps {
  css?: boolean
  classNames?: string | CSSTransitionClassNames
  timeout?:
    | number
    | {
        appear?: number
        enter?: number
        leave?: number
        disappear?: number
      }
}

export type TransitionElement = HTMLElement & {
  _ctc?: CSSTransitionClassNamesObject
  _done?: () => void
}

const CSSTransition: React.FunctionComponent<CSSTransitionProps> = (props) => {
  const {
    css = true,
    classNames,
    beforeEnter,
    enter,
    afterEnter,
    enterCancelled,
    beforeLeave,
    leave,
    afterLeave,
    leaveCancelled,
    timeout,
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

  const classNameMap = React.useMemo(() => {
    if (!classNames) {
      return null
    }
    if (typeof classNames === 'object') {
      return classNames
    }
    return {
      appear: `${classNames}-appear`,
      appearActive: `${classNames}-appear-active`,
      appearTo: `${classNames}-appear-to`,
      enter: `${classNames}-enter`,
      enterActive: `${classNames}-enter-active`,
      enterTo: `${classNames}-enter-to`,
      leave: `${classNames}-leave`,
      leaveActive: `${classNames}-leave-active`,
      leaveTo: `${classNames}-leave-to`,
      disappear: `${classNames}-disappear`,
      disappearActive: `${classNames}-disappear-active`,
      disappearTo: `${classNames}-disappear-to`
    }
  }, [classNames])

  const timeoutMap = React.useMemo(() => {
    if (!timeout) {
      return null
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
        css && {
          appear: classNameMap?.appear,
          appearActive: classNameMap?.appearActive
        },
        beforeAppear
      ),
    [css, classNameMap?.appear, classNameMap?.appearActive, beforeAppear]
  )

  const appearWrapper = React.useMemo(
    () =>
      createEventHook(
        ['appear'],
        css && {
          appearTo: classNameMap?.appearTo
        },
        timeoutMap?.appear,
        appear
      ),
    [css, classNameMap?.appearTo, timeoutMap?.appear, appear]
  )
  const afterAppearWrapper = React.useMemo(() => createAfterEventHook(afterAppear), [afterAppear])
  const appearCancelledWrapper = React.useMemo(() => createEventCancelledHook(appearCancelled), [
    appearCancelled
  ])

  const beforeEnterWrapper = React.useMemo(
    () =>
      createBeforeEventHook(
        css && {
          enter: classNameMap?.enter,
          enterActive: classNameMap?.enterActive
        },
        beforeEnter
      ),
    [css, classNameMap?.enter, classNameMap?.enterActive, beforeEnter]
  )

  const enterWrapper = React.useMemo(
    () =>
      createEventHook(
        ['enter'],
        css && {
          enterTo: classNameMap?.enterTo
        },
        timeoutMap?.enter,
        enter
      ),
    [css, classNameMap?.enterTo, timeoutMap?.enter, enter]
  )
  const afterEnterWrapper = React.useMemo(() => createAfterEventHook(afterEnter), [afterEnter])
  const enterCancelledWrapper = React.useMemo(() => createEventCancelledHook(enterCancelled), [
    enterCancelled
  ])

  const beforeLeaveWrapper = React.useMemo(
    () =>
      createBeforeEventHook(
        css && {
          leave: classNameMap?.leave,
          leaveActive: classNameMap?.leaveActive
        },
        beforeLeave
      ),
    [css, classNameMap?.leave, classNameMap?.leaveActive, beforeLeave]
  )

  const leaveWrapper = React.useMemo(
    () =>
      createEventHook(
        ['leave'],
        css && {
          leaveTo: classNameMap?.leaveTo
        },
        timeoutMap?.leave,
        leave
      ),
    [css, classNameMap?.leaveTo, timeoutMap?.leave, leave]
  )
  const afterLeaveWrapper = React.useMemo(() => createAfterEventHook(afterLeave), [afterLeave])
  const leaveCancelledWrapper = React.useMemo(() => createEventCancelledHook(leaveCancelled), [
    leaveCancelled
  ])

  const beforeDisappearWrapper = React.useMemo(
    () =>
      createBeforeEventHook(
        css && {
          disappear: classNameMap?.disappear,
          disappearActive: classNameMap?.disappearActive
        },
        beforeDisappear
      ),
    [css, classNameMap?.disappear, classNameMap?.disappearActive, beforeDisappear]
  )

  const disappearWrapper = React.useMemo(
    () =>
      createEventHook(
        ['disappear'],
        css && {
          disappearTo: classNameMap?.disappearTo
        },
        timeoutMap?.disappear,
        disappear
      ),
    [css, classNameMap?.disappearTo, timeoutMap?.disappear, disappear]
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

CSSTransition.propTypes = {
  classNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      appear: PropTypes.string.isRequired,
      appearActive: PropTypes.string.isRequired,
      appearTo: PropTypes.string.isRequired,
      enter: PropTypes.string.isRequired,
      enterActive: PropTypes.string.isRequired,
      enterTo: PropTypes.string.isRequired,
      leave: PropTypes.string.isRequired,
      leaveActive: PropTypes.string.isRequired,
      leaveTo: PropTypes.string.isRequired,
      disappear: PropTypes.string.isRequired,
      disappearActive: PropTypes.string.isRequired,
      disappearTo: PropTypes.string.isRequired
    })
  ]),
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number.isRequired,
      enter: PropTypes.number.isRequired,
      leave: PropTypes.number.isRequired,
      disappear: PropTypes.number.isRequired
    })
  ]),
  css: PropTypes.bool,
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
  disappearCancelled: PropTypes.func
}

export default CSSTransition

const createBeforeEventHook = (
  ctc: CSSTransitionClassNamesObject | false,
  nativeHook?: BeforeEventHook
): BeforeEventHook => {
  return (el: TransitionElement) => {
    // for TransitionGroup
    el._ctc = {}
    if (ctc) {
      for (const name of Object.keys(ctc)) {
        const key = name as keyof CSSTransitionClassNamesObject
        const clazz = ctc[key]
        if (clazz) {
          addClass(el, clazz)
          el._ctc[key] = clazz
        }
      }
    }
    nativeHook && nativeHook(el)
  }
}

const createEventHook = (
  removedClassNames: Array<keyof CSSTransitionClassNamesObject>,
  ctc: CSSTransitionClassNamesObject | false,
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
        for (const name of removedClassNames) {
          const clazz = el._ctc![name]
          if (clazz) {
            removeClass(el, clazz)
            delete el._ctc![name]
          }
        }
        if (ctc) {
          for (const name of Object.keys(ctc)) {
            const key = name as keyof CSSTransitionClassNamesObject
            const clazz = ctc[key]
            if (clazz) {
              addClass(el, clazz)
              el._ctc![key] = clazz
            }
          }
        }
        if (timeout && timeout > 0) {
          timeoutId = setTimeout(doneCb, timeout)
        } else {
          cancelEvent = onTransitionEnd(el, doneCb)
        }
      }
      nativeHook && nativeHook(el, doneCb, isCancelled)
    })

    el._done = () => {
      isInterrupt = true
      // 清除事件
      cancelEvent && cancelEvent()
      clearTimeout(timeoutId)
      if (!el._ctc) {
        return
      }
      // 移除所有样式
      for (const clazz of Object.values(el._ctc)) {
        clazz && el.classList.remove(clazz)
      }
      doneCb()
    }
  }
}

const createAfterOrCancelledEventHook = (
  nativeHook?: AfterEventHook | EventCancelledHook
): NonNullable<typeof nativeHook> => {
  return (el: TransitionElement) => {
    for (const name of Object.keys(el._ctc!)) {
      const key = name as keyof CSSTransitionClassNamesObject
      const clazz = el._ctc![key]
      clazz && removeClass(el, clazz)
      delete el._ctc![key]
    }
    nativeHook && nativeHook(el)
  }
}

const createAfterEventHook: (
  nativeHook?: AfterEventHook
) => AfterEventHook = createAfterOrCancelledEventHook

const createEventCancelledHook: (
  nativeHook?: EventCancelledHook
) => EventCancelledHook = createAfterOrCancelledEventHook
