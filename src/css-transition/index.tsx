import PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { addClass, removeClass } from '../commons/utils/dom'
import { onTransitionEnd, reflow } from '../commons/utils/transition'
import Transition, { TransitionProps } from '../transition'

export type CssTransitionClassNames = string | {
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
  classNames?: CssTransitionClassNames
  timeout?: number | {
    appear?: number,
    enter?: number,
    leave?: number
  }
}

export const displayName = `${namePrefix}-css-transition`

const CssTransition: React.FunctionComponent<CssTransitionProps> = props => {

  const {
    classNames,
    beforeAppear,
    appear,
    afterAppear,
    appearCancelled,
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

  const beforeAppearWrapper = React.useCallback((el: HTMLElement) => {
    if (classNameMap) {
      classNameMap.appear && addClass(el, classNameMap.appear)
      removeClass(el, classNameMap.leaveTo)
      classNameMap.appearActive && addClass(el, classNameMap.appearActive)
    }

    beforeAppear && beforeAppear(el)
  }, [classNameMap, beforeAppear])

  const appearWrapper = React.useCallback((el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
    if (!isCancelled()) {
      if (classNameMap) {
        reflow(el)
        classNameMap.appearTo && addClass(el, classNameMap.appearTo)
        classNameMap.appear && removeClass(el, classNameMap.appear)
      }
      if (timeoutMap && timeoutMap.appear) {
        setTimeout(done, timeoutMap.appear)
      } else {
        onTransitionEnd(el, done)
      }
      appear && appear(el, done, isCancelled)
    }
  }, [classNameMap, appear, timeoutMap])

  const afterAppearWrapper = React.useCallback((el: HTMLElement) => {
    if (classNameMap) {
      classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
      classNameMap.appear && removeClass(el, classNameMap.appear)
    }

    afterAppear && afterAppear(el)
  }, [classNameMap, afterAppear])

  const appearCancelledWrapper = React.useCallback((el: HTMLElement) => {
    if (classNameMap) {
      classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
      classNameMap.appear && removeClass(el, classNameMap.appear)
    }

    const call = appearCancelled || enterCancelled
    call && call(el)
  }, [classNameMap, appearCancelled, enterCancelled])

  const beforeEnterWrapper = React.useCallback((el: HTMLElement) => {
    if (classNameMap) {
      addClass(el, classNameMap.enter)
      removeClass(el, classNameMap.leaveTo)
      addClass(el, classNameMap.enterActive)
    }

    beforeEnter && beforeEnter(el)
  }, [classNameMap, beforeEnter])

  const enterWrapper = React.useCallback((el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
    if (!isCancelled()) {
      if (classNameMap) {
        reflow(el)
        addClass(el, classNameMap.enterTo)
        removeClass(el, classNameMap.enter)
      }
      if (timeoutMap && timeoutMap.enter) {
        setTimeout(done, timeoutMap.enter)
      } else {
        onTransitionEnd(el, done)
      }
      enter && enter(el, done, isCancelled)
    }
  }, [classNameMap, enter, timeoutMap])

  const afterEnterWrapper = React.useCallback((el: HTMLElement) => {
    if (classNameMap) {
      removeClass(el, classNameMap.enterActive)
      removeClass(el, classNameMap.enter)
    }

    afterEnter && afterEnter(el)
  }, [classNameMap, afterEnter])

  const enterCancelledWrapper = React.useCallback((el: HTMLElement) => {
    if (classNameMap) {
      removeClass(el, classNameMap.enterActive)
      removeClass(el, classNameMap.enter)
    }

    enterCancelled && enterCancelled(el)
  }, [classNameMap, enterCancelled])

  const beforeLeaveWrapper = React.useCallback((el: HTMLElement) => {
    if (classNameMap) {
      addClass(el, classNameMap.leave)
      removeClass(el, classNameMap.enterTo)
      classNameMap.appearTo && removeClass(el, classNameMap.appearTo)
      addClass(el, classNameMap.leaveActive)
    }

    beforeLeave && beforeLeave(el)
  }, [classNameMap, beforeLeave])

  const leaveWrapper = React.useCallback((el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
    if (!isCancelled()) {
      if (classNameMap) {
        reflow(el)
        addClass(el, classNameMap.leaveTo)
        removeClass(el, classNameMap.leave)
      }
      if (timeoutMap && timeoutMap.leave) {
        setTimeout(done, timeoutMap.leave)
      } else {
        onTransitionEnd(el, done)
      }
    }
    leave && leave(el, done, isCancelled)
  }, [classNameMap, leave, timeoutMap])

  const afterLeaveWrapper = React.useCallback((el: HTMLElement) => {
    if (classNameMap) {
      removeClass(el, classNameMap.leaveActive)
      removeClass(el, classNameMap.leave)
    }

    afterLeave && afterLeave(el)
  }, [classNameMap, afterLeave])

  const leaveCancelledWrapper = React.useCallback((el: HTMLElement) => {
    if (classNameMap) {
      removeClass(el, classNameMap.leaveActive)
      removeClass(el, classNameMap.leave)
    }

    leaveCancelled && leaveCancelled(el)
  }, [classNameMap, leaveCancelled])

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
  classNames: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    appear: PropTypes.string,
    appearActive: PropTypes.string,
    appearTo: PropTypes.string,
    enter: PropTypes.string.isRequired,
    enterActive: PropTypes.string.isRequired,
    enterTo: PropTypes.string.isRequired,
    leave: PropTypes.string.isRequired,
    leaveActive: PropTypes.string.isRequired,
    leaveTo: PropTypes.string.isRequired
  })]),
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    leave: PropTypes.number
  })])
}

export default CssTransition
