import PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { onTransitionEnd, reflow } from '../commons/utils/transition'
import CssTransition from '../css-transition'

export interface CollapseTransitionProp {
  children: React.ReactElement
  in: boolean
  transitionClassName?: string
}

const displayName = `${namePrefix}-collapse-transition`

const CollapseTransition: React.FunctionComponent<CollapseTransitionProp> = props => {
  const { children, transitionClassName = '', in: inProp } = props

  const styles: React.CSSProperties = React.useMemo(() => {
    return {
      boxSizing: 'border-box',
      overflow: 'hidden',
      paddingBottom: '0',
      paddingTop: '0',
      transition: transitionClassName ? '' : 'height 1s ease'
    }
  }, [transitionClassName])

  const transitionEvents = React.useMemo(() => {
    return {
      beforeEnter (el: HTMLElement) {
        if (el.dataset.leaveCancelled === 'true') {
          el.dataset.leaveCancelled = 'false'
          el.style.height = el.offsetHeight + 'px'
        } else {
          el.dataset.height = el.offsetHeight + ''
          el.style.height = '0'
        }
      },
      enter (el: HTMLElement, done: () => void, isCancelled: () => boolean) {
        if (!isCancelled()) {
          reflow(el)
          el.style.height = el.dataset.height + 'px'
          onTransitionEnd(el, done)
        }
      },
      enterCancelled (el: HTMLElement) {
        el.dataset.enterCancelled = 'true'
      },
      beforeLeave (el: HTMLElement) {
        if (el.dataset.enterCancelled === 'true') {
          el.dataset.enterCancelled = 'false'
        } else {
          el.dataset.height = el.offsetHeight + ''
        }
        el.style.height = el.offsetHeight + 'px'
      },
      leave (el: HTMLElement, done: () => void, isCancelled: () => boolean) {
        if (!isCancelled()) {
          reflow(el)
          el.style.height = '0'
          onTransitionEnd(el, done)
        }
      },
      leaveCancelled (el: HTMLElement) {
        el.dataset.leaveCancelled = 'true'
      }
    }
  }, [children])

  return (
    <CssTransition
      in={inProp}
      unmountOnLeave={true}
      mountOnEnter={true}
      {...transitionEvents}
    >
    <div className={transitionClassName} style={styles}>
        {children}
    </div>
    </CssTransition>
  )
}

CollapseTransition.displayName = displayName

CollapseTransition.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool.isRequired,
  transitionClassName: PropTypes.string
}

export default CollapseTransition
