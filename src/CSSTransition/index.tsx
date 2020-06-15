import PropTypes from 'prop-types'
import React from 'react'
import { addClass, removeClass } from '../commons/utils/class'
import { nextFrame, onTransitionEnd } from '../commons/utils/transition'
import Transition, { TransitionProps } from '../Transition'
import useConstantCallback from '../commons/hooks/useConstantCallback'

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

  const beforeAppearWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.appear && addClass(el, classNameMap.appear)
      classNameMap.appearActive && addClass(el, classNameMap.appearActive)
    }
    beforeAppear && beforeAppear(el)
  })

  const appearWrapper = useConstantCallback(
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
    }
  )

  const afterAppearWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
      classNameMap.appearTo && removeClass(el, classNameMap.appearTo)
    }
    afterAppear && afterAppear(el)
  })

  const appearCancelledWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
      classNameMap.appear && removeClass(el, classNameMap.appear)
      classNameMap.appearTo && removeClass(el, classNameMap.appearTo)
    }
    appearCancelled && appearCancelled(el)
  })

  const beforeEnterWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.enter && addClass(el, classNameMap.enter)
      classNameMap.enterActive && addClass(el, classNameMap.enterActive)
    }
    beforeEnter && beforeEnter(el)
  })

  const enterWrapper = useConstantCallback(
    (el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
      nextFrame(() => {
        if (!isCancelled()) {
          if (css) {
            if (classNameMap) {
              classNameMap.enter && removeClass(el, classNameMap.enter)
              classNameMap.enterTo && addClass(el, classNameMap.enterTo)
            }
            onTransitionEnd(el, done)
          }

          if (timeoutMap && timeoutMap.enter) {
            setTimeout(done, timeoutMap.enter)
          }
          enter && enter(el, done, isCancelled)
        }
      })
    }
  )

  const afterEnterWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.enterActive && removeClass(el, classNameMap.enterActive)
      classNameMap.enterTo && removeClass(el, classNameMap.enterTo)
    }
    afterEnter && afterEnter(el)
  })

  const enterCancelledWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.enterActive && removeClass(el, classNameMap.enterActive)
      classNameMap.enter && removeClass(el, classNameMap.enter)
      classNameMap.enterTo && removeClass(el, classNameMap.enterTo)
    }
    enterCancelled && enterCancelled(el)
  })

  const beforeLeaveWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.leave && addClass(el, classNameMap.leave)
      classNameMap.leaveActive && addClass(el, classNameMap.leaveActive)
    }
    beforeLeave && beforeLeave(el)
  })

  const leaveWrapper = useConstantCallback(
    (el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
      nextFrame(() => {
        if (!isCancelled()) {
          if (css) {
            if (classNameMap) {
              classNameMap.leave && removeClass(el, classNameMap.leave)
              classNameMap.leaveTo && addClass(el, classNameMap.leaveTo)
            }
            onTransitionEnd(el, done)
          }

          if (timeoutMap && timeoutMap.leave) {
            setTimeout(done, timeoutMap.leave)
          }
          leave && leave(el, done, isCancelled)
        }
      })
    }
  )

  const afterLeaveWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.leaveActive && removeClass(el, classNameMap.leaveActive)
      classNameMap.leaveTo && removeClass(el, classNameMap.leaveTo)
    }
    afterLeave && afterLeave(el)
  })

  const leaveCancelledWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.leaveActive && removeClass(el, classNameMap.leaveActive)
      classNameMap.leave && removeClass(el, classNameMap.leave)
      classNameMap.leaveTo && removeClass(el, classNameMap.leaveTo)
    }
    leaveCancelled && leaveCancelled(el)
  })

  const beforeDisappearWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.disappear && addClass(el, classNameMap.disappear)
      classNameMap.disappearActive && addClass(el, classNameMap.disappearActive)
    }
    beforeDisappear && beforeDisappear(el)
  })

  const disappearWrapper = useConstantCallback(
    (el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
      nextFrame(() => {
        if (!isCancelled()) {
          if (css) {
            if (classNameMap) {
              classNameMap.disappear && removeClass(el, classNameMap.disappear)
              classNameMap.disappearTo && addClass(el, classNameMap.disappearTo)
            }
            onTransitionEnd(el, done)
          }
          if (timeoutMap && timeoutMap.appear) {
            setTimeout(done, timeoutMap.disappear)
          }
          disappear && disappear(el, done, isCancelled)
        }
      })
    }
  )

  const afterDisappearWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.disappearActive && removeClass(el, classNameMap.disappearActive)
      classNameMap.disappearTo && removeClass(el, classNameMap.disappearTo)
    }
    afterDisappear && afterDisappear(el)
  })

  const disappearCancelledWrapper = useConstantCallback((el: HTMLElement) => {
    if (css && classNameMap) {
      classNameMap.disappearActive && removeClass(el, classNameMap.disappearActive)
      classNameMap.disappear && removeClass(el, classNameMap.disappear)
      classNameMap.disappearTo && removeClass(el, classNameMap.disappearTo)
    }
    disappearCancelled && disappearCancelled(el)
  })

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
      appear: PropTypes.string,
      appearActive: PropTypes.string,
      appearTo: PropTypes.string,
      enter: PropTypes.string,
      enterActive: PropTypes.string,
      enterTo: PropTypes.string,
      leave: PropTypes.string,
      leaveActive: PropTypes.string,
      leaveTo: PropTypes.string,
      disappear: PropTypes.string,
      disappearActive: PropTypes.string,
      disappearTo: PropTypes.string
    })
  ]),
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      leave: PropTypes.number,
      disappear: PropTypes.number
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
