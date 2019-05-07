import PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { addClass, removeClass } from '../commons/utils/dom'
import { onTransitionEnd, reflow } from '../commons/utils/transition'
import Transition from '../transition'

export interface CssTransitionProps {
  children: React.ReactElement
  classNames: string | {
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
  in: boolean
  isAppear?: boolean
  mountOnEnter?: boolean
  unmountOnLeave?: boolean
}

const displayName = `${namePrefix}-css-transition`

const CssTransition: React.FunctionComponent<CssTransitionProps> = props => {
  const { classNames, isAppear, children, in: inProp, unmountOnLeave, mountOnEnter } = props

  const classNameMap = React.useMemo(() => {
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

  const beforeAppear = React.useCallback((el: HTMLElement) => {
    classNameMap.appear && addClass(el, classNameMap.appear)
    removeClass(el, classNameMap.leaveTo)
    classNameMap.appearActive && addClass(el, classNameMap.appearActive)
  }, [classNameMap])

  const appear = React.useCallback((el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
    if (!isCancelled()) {
      classNameMap.appearTo && reflowAndAddClass(el, classNameMap.appearTo)
      classNameMap.appear && removeClass(el, classNameMap.appear)
      onTransitionEnd(el, done)
    }
  }, [classNameMap])

  const afterAppear = React.useCallback((el: HTMLElement) => {
    classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
    classNameMap.appear && removeClass(el, classNameMap.appear)
  }, [classNameMap])

  const appearCancelled = React.useCallback((el: HTMLElement) => {
    classNameMap.appearActive && removeClass(el, classNameMap.appearActive)
    classNameMap.appear && removeClass(el, classNameMap.appear)
  }, [classNameMap])

  const beforeEnter = React.useCallback((el: HTMLElement) => {
    addClass(el, classNameMap.enter)
    removeClass(el, classNameMap.leaveTo)
    addClass(el, classNameMap.enterActive)
  }, [classNameMap])

  const enter = React.useCallback((el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
    if (!isCancelled()) {
      reflowAndAddClass(el, classNameMap.enterTo)
      removeClass(el, classNameMap.enter)
      onTransitionEnd(el, done)
    }
  }, [classNameMap])

  const afterEnter = React.useCallback((el: HTMLElement) => {
    removeClass(el, classNameMap.enterActive)
    removeClass(el, classNameMap.enter)
  }, [classNameMap])

  const enterCancelled = React.useCallback((el: HTMLElement) => {
    removeClass(el, classNameMap.enterActive)
    removeClass(el, classNameMap.enter)
  }, [classNameMap])

  const beforeLeave = React.useCallback((el: HTMLElement) => {
    addClass(el, classNameMap.leave)
    removeClass(el, classNameMap.enterTo)
    classNameMap.appearTo && removeClass(el, classNameMap.appearTo)
    addClass(el, classNameMap.leaveActive)
  }, [classNameMap])

  const leave = React.useCallback((el: HTMLElement, done: () => void, isCancelled: () => boolean) => {
    if (!isCancelled()) {
      reflowAndAddClass(el, classNameMap.leaveTo)
      removeClass(el, classNameMap.leave)
      onTransitionEnd(el, done)
    }
  }, [classNameMap])

  const afterLeave = React.useCallback((el: HTMLElement) => {
    removeClass(el, classNameMap.leaveActive)
    removeClass(el, classNameMap.leave)
  }, [classNameMap])

  const leaveCancelled = React.useCallback((el: HTMLElement) => {
    removeClass(el, classNameMap.leaveActive)
    removeClass(el, classNameMap.leave)
  }, [classNameMap])

  return (
    <Transition
      beforeAppear={beforeAppear}
      appear={appear}
      afterAppear={afterAppear}
      appearCancelled={appearCancelled}
      beforeEnter={beforeEnter}
      enter={enter}
      afterEnter={afterEnter}
      enterCancelled={enterCancelled}
      beforeLeave={beforeLeave}
      leave={leave}
      afterLeave={afterLeave}
      leaveCancelled={leaveCancelled}
      isAppear={isAppear}
      in={inProp}
      unmountOnLeave={unmountOnLeave}
      mountOnEnter={mountOnEnter}
    >
      {children}
    </Transition>
  )
}

CssTransition.displayName = displayName

CssTransition.propTypes = {
  children: PropTypes.element.isRequired,
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
  })]).isRequired,
  in: PropTypes.bool.isRequired,
  isAppear: PropTypes.bool,
  unmountOnLeave: PropTypes.bool
}

export default CssTransition

const reflowAndAddClass = (el: HTMLElement, className: string) => {
  reflow(el)
  addClass(el, className)
}
