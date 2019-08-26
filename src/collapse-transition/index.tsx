import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import { nextFrame, onTransitionEnd } from '../commons/utils/transition'
import CssTransition from '../css-transition'

export interface CollapseTransitionProp {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  forceRender?: boolean
  show: boolean
  transitionClassName?: string
}

export const displayName = `${namePrefix}-collapse-transition`

const CollapseTransition: React.FunctionComponent<CollapseTransitionProp> = props => {
  const { children, transitionClassName, show, forceRender } = props

  const wrapperRef = React.useRef<HTMLDivElement>(null)

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
      beforeEnter(el: HTMLElement) {
        if (el.dataset.leaveCancelled === 'true') {
          el.style.height = el.offsetHeight + 'px'
        } else {
          el.style.height = '0'
        }
      },
      enter(el: HTMLElement, done: () => void, isCancelled: () => boolean) {
        nextFrame(() => {
          if (!isCancelled()) {
            // 高度设置为内容高度
            el.style.height = wrapperRef.current!.offsetHeight + 'px'
            onTransitionEnd(el, done)
          }
        })
      },
      afterEnter(el: HTMLElement) {
        // 防止内容高度变更后高度不会自动改变
        el.style.height = null
      },
      enterCancelled(el: HTMLElement) {
        el.dataset.enterCancelled = 'true'
      },
      beforeLeave(el: HTMLElement) {
        if (el.dataset.enterCancelled === 'true') {
          el.dataset.enterCancelled = 'false'
        }
        el.style.height = wrapperRef.current!.offsetHeight + 'px'
      },
      leave(el: HTMLElement, done: () => void, isCancelled: () => boolean) {
        nextFrame(() => {
          if (!isCancelled()) {
            el.style.height = '0'
            onTransitionEnd(el, done)
          }
        })
      },
      leaveCancelled(el: HTMLElement) {
        el.dataset.leaveCancelled = 'true'
      }
    }
  }, [])

  return (
    <CssTransition show={show} forceRender={forceRender} {...transitionEvents}>
      <div className={transitionClassName} style={styles}>
        <div ref={wrapperRef} style={{ position: 'relative' }}>
          {children}
        </div>
      </div>
    </CssTransition>
  )
}

CollapseTransition.displayName = displayName

CollapseTransition.propTypes = {
  transitionClassName: PropTypes.string
}

export default CollapseTransition
