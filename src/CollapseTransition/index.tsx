import PropTypes from 'prop-types'
import React from 'react'
import CSSTransition, { CSSTransitionClasses, TransitionElement } from '../CSSTransition'
import { forceReflow } from '../commons/utils/transition'
import { removeClass, addClass } from '../commons/utils/class'

export interface CollapseTransitionProp {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  mountOnEnter?: boolean
  unmountOnLeave?: boolean
  in: boolean
  transitionClasses?: CSSTransitionClasses
  horizontal?: boolean
  transitionOnFirst?: boolean
}

const CollapseTransition: React.FunctionComponent<CollapseTransitionProp> = (props) => {
  const {
    children,
    transitionClasses,
    in: inProp,
    mountOnEnter,
    unmountOnLeave,
    horizontal,
    transitionOnFirst
  } = props

  const transitionEvents = React.useMemo(() => {
    const padding1 = horizontal ? 'paddingLeft' : 'paddingTop'
    const padding2 = horizontal ? 'paddingRight' : 'paddingBottom'
    const size = horizontal ? 'width' : 'height'
    const actualSize = horizontal ? 'actualWidth' : 'actualHeight'
    let cancelled = false
    return {
      beforeEnter(el: TransitionElement) {
        el.dataset[padding1] = el.style[padding1]
        el.dataset[padding2] = el.style[padding2]
        el.dataset[size] = el.style[size]
        el.dataset.overflow = el.style.overflow

        if (!cancelled) {
          removeClass(el, el._ctc?.enterActive || '')
          el.dataset[actualSize] = getComputedStyle(el)[size]
          removeClass(el, el._ctc?.enter || '')
        }
        el.style.overflow = 'hidden'
        el.style[size] = '0'
        el.style[padding1] = '0'
        el.style[padding2] = '0'
        if (!cancelled) {
          addClass(el, el._ctc?.enter || '')
          forceReflow()
          addClass(el, el._ctc?.enterActive || '')
        }
        cancelled = false
      },
      enter(el: HTMLElement) {
        el.style[size] = `${el.dataset[actualSize]!}`
        el.style[padding1] = el.dataset[padding1]!
        el.style[padding2] = el.dataset[padding2]!
      },
      afterEnter(el: HTMLElement) {
        el.style[size] = el.dataset[size]!
        el.style.overflow = el.dataset.overflow!
      },
      enterCancelled(el: HTMLElement) {
        el.style[padding1] = el.dataset[padding1]!
        el.style[padding2] = el.dataset[padding2]!
        el.style[size] = el.dataset[size]!
        el.style.overflow = el.dataset.overflow!
        cancelled = true
      },
      beforeLeave(el: TransitionElement) {
        el.dataset[padding1] = el.style[padding1]
        el.dataset[padding2] = el.style[padding2]
        el.dataset[size] = el.style[size]
        el.dataset.overflow = el.style.overflow

        if (!cancelled) {
          el.dataset[actualSize] = getComputedStyle(el)[size]
        }

        el.style[size] = `${el.dataset[actualSize]!}`
        el.style.overflow = 'hidden'

        cancelled = false
      },
      leave(el: HTMLElement) {
        forceReflow()
        el.style[padding1] = '0'
        el.style[padding2] = '0'
        el.style[size] = '0'
      },
      afterLeave(el: HTMLElement) {
        el.style[padding1] = el.dataset[padding1]!
        el.style[padding2] = el.dataset[padding2]!
        el.style[size] = el.dataset[size]!
        el.style.overflow = el.dataset.overflow!
      },
      leaveCancelled(el: HTMLElement) {
        el.style[padding1] = el.dataset[padding1]!
        el.style[padding2] = el.dataset[padding2]!
        el.style[size] = el.dataset[size]!
        el.style.overflow = el.dataset.overflow!
        cancelled = true
      }
    }
  }, [horizontal])

  return (
    <CSSTransition
      {...transitionEvents}
      transitionClasses={transitionClasses}
      transitionOnFirst={transitionOnFirst}
      in={inProp}
      mountOnEnter={mountOnEnter}
      unmountOnLeave={unmountOnLeave}
    >
      {children}
    </CSSTransition>
  )
}

CollapseTransition.displayName = 'CollapseTransition'

CollapseTransition.propTypes = {
  transitionClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  horizontal: PropTypes.bool,
  children: PropTypes.element.isRequired,
  in: PropTypes.bool.isRequired,
  mountOnEnter: PropTypes.bool,
  unmountOnLeave: PropTypes.bool,
  transitionOnFirst: PropTypes.bool
}

export default CollapseTransition
