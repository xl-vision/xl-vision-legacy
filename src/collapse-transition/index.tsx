import PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { addClass, getPxNumber, removeClass } from '../commons/utils/dom'
import { onTransitionEnd, reflow } from '../commons/utils/transition'
import Transition from '../transition'

export interface CollapseTransitionProp {
  children: React.ReactElement
  in: boolean
  transitionClassName?: string
}

const displayName = `${namePrefix}-collapse-transition`

const CollapseTransition: React.FunctionComponent<CollapseTransitionProp> = props => {
  const { children, transitionClassName = '', in: inProp } = props

  const transitionEvents = React.useMemo(() => {
    return {
      beforeEnter (el: HTMLElement) {
        const style = getComputedStyle(el, null)
        if (el.dataset.leaveCancelled === 'true') {
          el.dataset.leaveCancelled = 'false'
          el.style.height = getActualHeight(el, style)
          el.style.paddingTop = style.paddingTop
          el.style.paddingBottom = style.paddingBottom
        } else {
          initDataSet(el, style)
          el.style.height = '0'
          el.style.paddingTop = '0'
          el.style.paddingBottom = '0'
        }
        el.style.overflow = 'hidden'
      },
      enter (el: HTMLElement, done: () => void) {
        // force repaint
        reflow(el)
        el.style.height = el.dataset.height + ''
        el.style.paddingTop = el.dataset.paddingTop + ''
        el.style.paddingBottom = el.dataset.paddingBottom + ''
        addClass(el, transitionClassName)
        onTransitionEnd(el, done)
      },

      afterEnter (el: HTMLElement) {
        // for safari: remove class then reset height is necessary
        removeClass(el, transitionClassName)
        el.style.height = el.dataset.oldHeight + ''
        el.style.overflow = el.dataset.oldOverflow + ''
        el.style.paddingTop = el.dataset.oldPaddingTop + ''
        el.style.paddingBottom = el.dataset.oldPaddingBottom + ''
      },
      enterCancelled (el: HTMLElement) {
        el.dataset.enterCancelled = 'true'
      },
      beforeLeave (el: HTMLElement) {
        const style = getComputedStyle(el, null)

        if (el.dataset.enterCancelled === 'true') {
          el.dataset.enterCancelled = 'false'
        } else {
          initDataSet(el, style)
        }
        el.style.height = getActualHeight(el, style)
        el.style.paddingTop = style.paddingTop
        el.style.paddingBottom = style.paddingBottom
        el.style.overflow = 'hidden'
      },
      leave (el: HTMLElement, done: () => void) {
        // force repaint
        reflow(el)
        el.style.height = '0'
        el.style.paddingTop = '0'
        el.style.paddingBottom = '0'
        addClass(el, transitionClassName)
        onTransitionEnd(el, done)
      },
      afterLeave (el: HTMLElement) {
        removeClass(el, transitionClassName)
        el.style.height = el.dataset.oldHeight + ''
        el.style.overflow = el.dataset.oldOverflow + ''
        el.style.paddingTop = el.dataset.oldPaddingTop + ''
        el.style.paddingBottom = el.dataset.oldPaddingBottom + ''
      },
      leaveCancelled (el: HTMLElement) {
        el.dataset.leaveCancelled = 'true'
      }
    }
  }, [children, transitionClassName])

  return (
    <Transition
      in={inProp}
      unmountOnLeave={true}
      mountOnEnter={true}
      {...transitionEvents}
    >
        {children}
    </Transition>
  )
}

CollapseTransition.displayName = displayName

CollapseTransition.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool.isRequired,
  transitionClassName: PropTypes.string
}

export default CollapseTransition

const initDataSet = (el: HTMLElement, style: CSSStyleDeclaration) => {
  el.dataset.oldPaddingTop = el.style.paddingTop + ''
  el.dataset.oldPaddingBottom = el.style.paddingBottom + ''
  el.dataset.oldHeight = el.style.height + ''
  el.dataset.oldOverflow = el.style.overflow + ''

  el.dataset.paddingTop = style.paddingTop + ''
  el.dataset.paddingBottom = style.paddingBottom + ''

  el.dataset.height = getActualHeight(el, style)
}

const getActualHeight = (el: HTMLElement, style: CSSStyleDeclaration) => {
  if (style.boxSizing === 'border-box') {
    return el.scrollHeight + 'px'
  } else {
    return el.scrollHeight - getPxNumber(el.dataset.paddingTop) - getPxNumber(el.dataset.paddingBottom) + 'px'
  }
}
