import PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { addClass, removeClass } from '../commons/utils/dom'
import Transition, { ProxyElement } from '../transition'
import { onTransitionEnd, reflowAndAddClass } from './utils'

export interface CSSTransitionProps {
  children: React.ReactElement
  classNames: string | {
    afterAppear?: string
    afterEnter: string
    afterLeave: string
    appear?: string
    beforeAppear?: string
    beforeEnter: string
    beforeLeave: string
    enter: string
    leave: string
  }
  in: boolean
  isAppear?: boolean
  unmountOnLeave?: boolean
}

const displayName = `${namePrefix}-css-transition`

const CssTransition: React.FunctionComponent<CSSTransitionProps> = props => {
  const { classNames, isAppear, children, in: inProp, unmountOnLeave } = props

  const classNameMap = React.useMemo(() => {
    if (typeof classNames === 'object') {
      return classNames
    }
    return {
      afterAppear: `${classNames}-appear-to`,
      afterEnter: `${classNames}-enter-to`,
      afterLeave: `${classNames}-leave-to`,
      appear: `${classNames}-appear-active`,
      beforeAppear: `${classNames}-appear`,
      beforeEnter: `${classNames}-enter`,
      beforeLeave: `${classNames}-leave`,
      enter: `${classNames}-enter-active`,
      leave: `${classNames}-leave-active`
    }
  }, [classNames])

  const beforeAppear = React.useCallback((el: HTMLElement) => {
    if (classNameMap.beforeAppear) {
      removeClass(el, classNameMap.afterLeave)
      addClass(el, classNameMap.beforeAppear)
    }
  }, [])

  const appear = React.useCallback((el: ProxyElement, done: () => void) => {
    if (classNameMap.appear) {
      reflowAndAddClass(el, classNameMap.appear)
    }
    onTransitionEnd(el, done)
  }, [])

  const afterAppear = React.useCallback((el: HTMLElement) => {
    if (classNameMap.afterAppear) {
      addClass(el, classNameMap.afterAppear)
    }
    if (classNameMap.beforeAppear) {
      removeClass(el, classNameMap.beforeAppear)
    }
    if (classNameMap.appear) {
      removeClass(el, classNameMap.appear)
    }
  }, [])

  const appearCancelled = React.useCallback((el: HTMLElement) => {
    if (classNameMap.beforeAppear) {
      addClass(el, classNameMap.beforeAppear)
    }
    if (classNameMap.appear) {
      removeClass(el, classNameMap.appear)
    }
  }, [])

  const beforeEnter = React.useCallback((el: HTMLElement) => {
    removeClass(el, classNameMap.afterLeave)
    addClass(el, classNameMap.beforeEnter)
  }, [])

  const enter = React.useCallback((el: ProxyElement, done: () => void) => {
    reflowAndAddClass(el, classNameMap.enter)
    onTransitionEnd(el, done)
  }, [])

  const afterEnter = React.useCallback((el: HTMLElement) => {
    addClass(el, classNameMap.afterEnter)
    removeClass(el, classNameMap.beforeEnter)
    removeClass(el, classNameMap.enter)
  }, [])

  const enterCancelled = React.useCallback((el: HTMLElement) => {
    removeClass(el, classNameMap.beforeEnter)
    removeClass(el, classNameMap.enter)
  }, [])

  const beforeLeave = React.useCallback((el: HTMLElement) => {
    classNameMap.afterAppear && removeClass(el, classNameMap.afterAppear)
    removeClass(el, classNameMap.afterEnter)
    addClass(el, classNameMap.beforeLeave)
  }, [])

  const leave = React.useCallback((el: ProxyElement, done: () => void) => {
    reflowAndAddClass(el, classNameMap.leave)
    onTransitionEnd(el, done)
  }, [])

  const afterLeave = React.useCallback((el: HTMLElement) => {
    addClass(el, classNameMap.afterLeave)
    removeClass(el, classNameMap.leave)
    removeClass(el, classNameMap.beforeLeave)
  }, [])

  const leaveCancelled = React.useCallback((el: HTMLElement) => {
    removeClass(el, classNameMap.leave)
    removeClass(el, classNameMap.beforeLeave)
  }, [])

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
    >
      {children}
    </Transition>
  )
}

CssTransition.displayName = displayName

CssTransition.propTypes = {
  children: PropTypes.element.isRequired,
  classNames: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    afterAppear: PropTypes.string,
    afterEnter: PropTypes.string.isRequired,
    afterLeave: PropTypes.string.isRequired,
    appear: PropTypes.string,
    beforeAppear: PropTypes.string,
    beforeEnter: PropTypes.string.isRequired,
    beforeLeave: PropTypes.string.isRequired,
    enter: PropTypes.string.isRequired,
    leave: PropTypes.string.isRequired
  })]).isRequired,
  in: PropTypes.bool.isRequired,
  isAppear: PropTypes.bool,
  unmountOnLeave: PropTypes.bool
}

export default CssTransition
