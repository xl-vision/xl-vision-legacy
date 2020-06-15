import PropTypes from 'prop-types'
import React from 'react'
import CSSTransition from '../CSSTransition'

export interface CollapseTransitionProp {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  forceRender?: boolean
  in: boolean
  transitionClassName?: string
  horizontal?: boolean
  transitionOnFirst?: boolean
}

const CollapseTransition: React.FunctionComponent<CollapseTransitionProp> = (props) => {
  const {
    children,
    transitionClassName,
    in: inProp,
    forceRender,
    horizontal,
    transitionOnFirst
  } = props

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
    <CSSTransition
      transitionOnFirst={transitionOnFirst}
      {...transitionEvents}
      in={inProp}
      forceRender={forceRender}
    >
      <div className={transitionClassName} style={styles}>
        <div ref={wrapperRef} style={{ position: 'relative' }}>
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}

CollapseTransition.propTypes = {
  transitionClassName: PropTypes.string,
  horizontal: PropTypes.bool,
  children: PropTypes.element.isRequired,
  in: PropTypes.bool.isRequired,
  forceRender: PropTypes.bool,
  transitionOnFirst: PropTypes.bool
}

export default CollapseTransition
