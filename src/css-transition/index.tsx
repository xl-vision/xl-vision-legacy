import PropTypes from 'prop-types'
import React from 'react'
import { addClass, removeClass } from '../commons/utils/dom'
import { nextFrame, onTransitionEnd } from '../commons/utils/transition'
import Transition, { TransitionProps } from '../transition'

export type CssTransitionClassNames = {
  appear?: string
  appearActive?: string
  appearTo?: string
  enter: string
  enterActive: string
  enterTo: string
  leave: string
  leaveActive: string
  leaveTo: string
}

export interface CssTransitionProps extends TransitionProps {
  css?: boolean
  classNames?: string | CssTransitionClassNames
  timeout?:
    | number
    | {
        appear?: number
        enter?: number
        leave?: number
      }
}

const CssTransition: React.FunctionComponent<CssTransitionProps> = props => {
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

  let { beforeAppear, appear, appearCancelled, afterAppear } = others

  delete others.beforeAppear
  delete others.appear
  delete others.appearCancelled
  delete others.afterAppear

  // 如果开启appear,默认使用enter的生命周期方法
  beforeAppear = beforeAppear || beforeEnter
  appear = appear || enter
  afterAppear = afterAppear || afterEnter
  appearCancelled = appearCancelled || enterCancelled

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
      leaveTo: `${classNames}-leave-to`
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
      leave: timeout
    }
  }, [timeout])

  const beforeAppearWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (css && classNameMap) {
        classNameMap.appear && addClass(el, classNameMap.appear)
        classNameMap.appearActive && addClass(el, classNameMap.appearActive)
      }
      beforeAppear && beforeAppear(el)
    },
    [classNameMap, beforeAppear, css]
  )

  const appearWrapper = React.useCallback(
    (el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
      nextFrame(() => {
        if (!isCancelled()) {
          if (css) {
            if (classNameMap) {
              classNameMap.appear && removeClass(el, classNameMap.appear)
              classNameMap.appearTo && addClass(el, classNameMap.appearTo)
            }
            onTransitionEnd(el, done)
          }
          if (timeoutMap && timeoutMap.appear) {
            setTimeout(done, timeoutMap.appear)
          }
          appear && appear(el, done, isCancelled)
        }
      })
    },
    [classNameMap, appear, timeoutMap, css]
  )

  const afterAppearWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (css && classNameMap) {
        classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
        classNameMap.appearTo && removeClass(el, classNameMap.appearTo)
      }
      afterAppear && afterAppear(el)
    },
    [classNameMap, afterAppear, css]
  )

  const appearCancelledWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (css && classNameMap) {
        classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
        classNameMap.appear && removeClass(el, classNameMap.appear)
        classNameMap.appearTo && removeClass(el, classNameMap.appearTo)
      }
      appearCancelled && appearCancelled(el)
    },
    [classNameMap, appearCancelled, css]
  )

  const beforeEnterWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (css && classNameMap) {
        addClass(el, classNameMap.enter)
        addClass(el, classNameMap.enterActive)
      }
      beforeEnter && beforeEnter(el)
    },
    [classNameMap, beforeEnter, css]
  )

  const enterWrapper = React.useCallback(
    (el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
      nextFrame(() => {
        if (!isCancelled()) {
          if (css) {
            if (classNameMap) {
              removeClass(el, classNameMap.enter)
              addClass(el, classNameMap.enterTo)
            }
            onTransitionEnd(el, done)
          }

          if (timeoutMap && timeoutMap.enter) {
            setTimeout(done, timeoutMap.enter)
          }
          enter && enter(el, done, isCancelled)
        }
      })
    },
    [classNameMap, enter, timeoutMap, css]
  )

  const afterEnterWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (css && classNameMap) {
        removeClass(el, classNameMap.enterActive)
        removeClass(el, classNameMap.enterTo)
      }
      afterEnter && afterEnter(el)
    },
    [classNameMap, afterEnter, css]
  )

  const enterCancelledWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (css && classNameMap) {
        removeClass(el, classNameMap.enterActive)
        removeClass(el, classNameMap.enter)
        removeClass(el, classNameMap.enterTo)
      }
      enterCancelled && enterCancelled(el)
    },
    [classNameMap, enterCancelled, css]
  )

  const beforeLeaveWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (css && classNameMap) {
        addClass(el, classNameMap.leave)
        addClass(el, classNameMap.leaveActive)
      }
      beforeLeave && beforeLeave(el)
    },
    [classNameMap, beforeLeave, css]
  )

  const leaveWrapper = React.useCallback(
    (el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
      nextFrame(() => {
        if (!isCancelled()) {
          if (css) {
            if (classNameMap) {
              removeClass(el, classNameMap.leave)
              addClass(el, classNameMap.leaveTo)
            }
            onTransitionEnd(el, done)
          }

          if (timeoutMap && timeoutMap.leave) {
            setTimeout(done, timeoutMap.leave)
          }
          leave && leave(el, done, isCancelled)
        }
      })
    },
    [classNameMap, leave, timeoutMap, css]
  )

  const afterLeaveWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (css && classNameMap) {
        removeClass(el, classNameMap.leaveActive)
        removeClass(el, classNameMap.leaveTo)
      }
      afterLeave && afterLeave(el)
    },
    [classNameMap, afterLeave, css]
  )

  const leaveCancelledWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (css && classNameMap) {
        removeClass(el, classNameMap.leaveActive)
        removeClass(el, classNameMap.leave)
        removeClass(el, classNameMap.leaveTo)
      }
      leaveCancelled && leaveCancelled(el)
    },
    [classNameMap, leaveCancelled, css]
  )

  return (
    <Transition
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
      {...others}
    />
  )
}

CssTransition.propTypes = {
  classNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      appear: PropTypes.string,
      appearActive: PropTypes.string,
      appearTo: PropTypes.string,
      enter: PropTypes.string.isRequired,
      enterActive: PropTypes.string.isRequired,
      enterTo: PropTypes.string.isRequired,
      leave: PropTypes.string.isRequired,
      leaveActive: PropTypes.string.isRequired,
      leaveTo: PropTypes.string.isRequired
    })
  ]),
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      leave: PropTypes.number
    })
  ]),
  css: PropTypes.bool
}

export default CssTransition
