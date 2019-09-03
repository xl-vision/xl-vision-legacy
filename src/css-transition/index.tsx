import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import { addClass, removeClass } from '../commons/utils/dom'
import { nextFrame, onTransitionEnd } from '../commons/utils/transition'
import Transition, { TransitionProps } from '../transition'

export type CssTransitionClassNames =
  | string
  | {
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
  classNames?: CssTransitionClassNames
  timeout?:
    | number
    | {
        appear?: number
        enter?: number
        leave?: number
      }
}

export const displayName = `${namePrefix}-css-transition`

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
      if (classNameMap) {
        classNameMap.appear && addClass(el, classNameMap.appear)
        classNameMap.appearActive && addClass(el, classNameMap.appearActive)
      }
      beforeAppear && beforeAppear(el)
    },
    [classNameMap, beforeAppear]
  )

  const appearWrapper = React.useCallback(
    (el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
      nextFrame(() => {
        if (!isCancelled()) {
          if (classNameMap) {
            classNameMap.appear && removeClass(el, classNameMap.appear)
            classNameMap.appearTo && addClass(el, classNameMap.appearTo)
          }
          if (timeoutMap && timeoutMap.appear) {
            setTimeout(done, timeoutMap.appear)
            // 如果启用css动画，会尝试在css动画结束后自动回调，如果想使用js动画，可以禁止css动画，就可以获得完全地js动画能力
          } else if (css) {
            onTransitionEnd(el, done)
          }
          appear && appear(el, done, isCancelled)
        }
      })
    },
    [classNameMap, appear, timeoutMap, css]
  )

  const afterAppearWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (classNameMap) {
        classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
        classNameMap.appearTo && removeClass(el, classNameMap.appearTo)
      }
      afterAppear && afterAppear(el)
    },
    [classNameMap, afterAppear]
  )

  const appearCancelledWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (classNameMap) {
        classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
        classNameMap.appear && removeClass(el, classNameMap.appear)
        classNameMap.appearTo && removeClass(el, classNameMap.appearTo)
      }
      appearCancelled && appearCancelled(el)
    },
    [classNameMap, appearCancelled]
  )

  const beforeEnterWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (classNameMap) {
        addClass(el, classNameMap.enter)
        addClass(el, classNameMap.enterActive)
      }
      beforeEnter && beforeEnter(el)
    },
    [classNameMap, beforeEnter]
  )

  const enterWrapper = React.useCallback(
    (el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
      nextFrame(() => {
        if (!isCancelled()) {
          if (classNameMap) {
            removeClass(el, classNameMap.enter)
            addClass(el, classNameMap.enterTo)
          }
          if (timeoutMap && timeoutMap.enter) {
            setTimeout(done, timeoutMap.enter)
          } else if (css) {
            onTransitionEnd(el, done)
          }
          enter && enter(el, done, isCancelled)
        }
      })
    },
    [classNameMap, enter, timeoutMap, css]
  )

  const afterEnterWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (classNameMap) {
        removeClass(el, classNameMap.enterActive)
        removeClass(el, classNameMap.enterTo)
      }
      afterEnter && afterEnter(el)
    },
    [classNameMap, afterEnter]
  )

  const enterCancelledWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (classNameMap) {
        removeClass(el, classNameMap.enterActive)
        removeClass(el, classNameMap.enter)
        removeClass(el, classNameMap.enterTo)
      }
      enterCancelled && enterCancelled(el)
    },
    [classNameMap, enterCancelled]
  )

  const beforeLeaveWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (classNameMap) {
        addClass(el, classNameMap.leave)
        addClass(el, classNameMap.leaveActive)
      }
      beforeLeave && beforeLeave(el)
    },
    [classNameMap, beforeLeave]
  )

  const leaveWrapper = React.useCallback(
    (el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
      nextFrame(() => {
        if (!isCancelled()) {
          if (classNameMap) {
            removeClass(el, classNameMap.leave)
            addClass(el, classNameMap.leaveTo)
          }
          if (timeoutMap && timeoutMap.leave) {
            setTimeout(done, timeoutMap.leave)
          } else if (css) {
            onTransitionEnd(el, done)
          }
          leave && leave(el, done, isCancelled)
        }
      })
    },
    [classNameMap, leave, timeoutMap, css]
  )

  const afterLeaveWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (classNameMap) {
        removeClass(el, classNameMap.leaveActive)
        removeClass(el, classNameMap.leaveTo)
      }
      afterLeave && afterLeave(el)
    },
    [classNameMap, afterLeave]
  )

  const leaveCancelledWrapper = React.useCallback(
    (el: HTMLElement) => {
      if (classNameMap) {
        removeClass(el, classNameMap.leaveActive)
        removeClass(el, classNameMap.leave)
        removeClass(el, classNameMap.leaveTo)
      }
      leaveCancelled && leaveCancelled(el)
    },
    [classNameMap, leaveCancelled]
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

CssTransition.displayName = displayName

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
  ])
}

export default CssTransition
