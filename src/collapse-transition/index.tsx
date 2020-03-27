import PropTypes from 'prop-types'
import React from 'react'
import CssTransition from '../css-transition'

export interface CollapseTransitionProp {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  forceRender?: boolean
  show: boolean
  transitionClassName?: string
  horizontal?: boolean
}

const CollapseTransition: React.FunctionComponent<CollapseTransitionProp> = (props) => {
  const { children, transitionClassName, show, forceRender, horizontal } = props

  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const styles: React.CSSProperties = React.useMemo(() => {
    return {
      boxSizing: 'border-box',
      overflow: 'hidden',
      paddingBottom: '0',
      paddingTop: '0',
      transition: transitionClassName ? '' : `${horizontal ? 'width' : 'height'} 1s ease`
    }
  }, [transitionClassName, horizontal])

  const transitionEvents = React.useMemo(() => {
    const key = horizontal ? 'width' : 'height'
    const offsetKey = horizontal ? 'offsetWidth' : 'offsetHeight'
    let size: number
    let isCancelled = false
    return {
      beforeEnter(el: HTMLElement) {
        if (isCancelled) {
          el.style[key] = el[offsetKey] + 'px'
          isCancelled = false
        } else {
          size = wrapperRef.current![offsetKey]
          el.style[key] = '0'
        }
      },
      enter(el: HTMLElement, _done: () => void, isCancelled: () => boolean) {
        if (!isCancelled()) {
          // 高度设置为内容高度
          el.style[key] = size + 'px'
        }
      },
      afterEnter(el: HTMLElement) {
        // 防止内容高度变更后高度不会自动改变
        el.style[key] = ''
      },
      enterCancelled() {
        isCancelled = true
      },
      beforeLeave(el: HTMLElement) {
        if (isCancelled) {
          isCancelled = false
        } else {
          size = wrapperRef.current![offsetKey]
        }
        el.style[key] = wrapperRef.current![offsetKey] + 'px'
      },
      leave(el: HTMLElement, _done: () => void, isCancelled: () => boolean) {
        if (!isCancelled()) {
          el.style[key] = '0'
        }
      },
      leaveCancelled() {
        isCancelled = true
      }
    }
  }, [horizontal])

  return (
    <CssTransition {...transitionEvents} show={show} forceRender={forceRender}>
      <div className={transitionClassName} style={styles}>
        <div ref={wrapperRef} style={{ position: 'relative' }}>
          {children}
        </div>
      </div>
    </CssTransition>
  )
}

CollapseTransition.propTypes = {
  transitionClassName: PropTypes.string,
  horizontal: PropTypes.bool
}

export default CollapseTransition
