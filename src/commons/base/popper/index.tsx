import PropTypes from 'prop-types'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CssTransition, { CssTransitionClassNames } from '../../../css-transition'
import { namePrefix } from '../../config'
import useClickOutside from '../../hooks/useClickOutside'
import useUnmount from '../../hooks/useUnmount'
import useUpdate from '../../hooks/useUpdate'
import { getPosition, include, isStyleSupport } from '../../utils/dom'
import { mergeEvents, off, on } from '../../utils/event'
import { increaseZIndex } from '../../utils/zIndex-manager'

export type Placement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'

export interface PopperProps {
  allowPopupEnter?: boolean
  arrow?: (placement: Placement, center: { x: number, y: number }) => React.ReactElement<React.HTMLAttributes<HTMLElement>>
  // autoAdjustOverflow?: boolean,
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  delayHide?: number
  delayShow?: number
  getPopupContainer?: () => HTMLElement
  offset?: number
  onVisibleChange?: (visible: boolean) => void,
  overlayClassName?: string | ((placement: Placement) => string),
  overlayStyle?: React.CSSProperties | ((placement: Placement) => React.CSSProperties),
  placement?: Placement
  popup: (placement: Placement) => React.ReactNode
  transitionName?: CssTransitionClassNames | ((placement: Placement) => CssTransitionClassNames)
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | 'custom'
  visible?: boolean,
}

const TIME_DELAY = 20

const isTransformSupport = isStyleSupport('transform')

export const displayName = `${namePrefix}-popper`

const Popper: React.FunctionComponent<PopperProps> = props => {
  const {
    // autoAdjustOverflow,
    children,
    getPopupContainer = () => document.body,
    onVisibleChange,
    overlayClassName,
    overlayStyle,
    placement = 'bottom',
    popup,
    transitionName,
    trigger = 'hover',
    allowPopupEnter = true,
    arrow,
    visible = false,
    delayHide = 0,
    delayShow = 0,
    offset = 0
  } = props

  const popupRef = React.useRef<HTMLDivElement>(null)
  const referenceRef = React.useRef<HTMLElement>(null)

  const delayTimerRef = React.useRef<NodeJS.Timeout>()

  const [actualVisible, setActualVisible] = React.useState(visible)

  const [popupPosition, setPopupPosition] = React.useState<{ bottom: number, left: number, right: number, top: number }>()
  const [referencePosition, setReferencePosition] = React.useState<{ bottom: number, left: number, right: number, top: number }>()

  const [left, setLeft] = React.useState(0)
  const [top, setTop] = React.useState(0)

  // 延迟渲染弹出框，只在第一次需要弹出时才渲染
  const [needMount, setNeedMount] = React.useState(false)
  let isUnmount = false

  useUnmount(() => {
    isUnmount = true
  })

  const setActualWrapper = (isVisible: boolean) => {
    if (isVisible && !needMount) {
      setNeedMount(true)
    }

    clearTimeout(delayTimerRef.current!)
    delayTimerRef.current = setTimeout(() => {
      if (!isUnmount && isVisible !== actualVisible) {
        setActualVisible(isVisible)
      }
    }, isVisible ? Math.max(delayShow, TIME_DELAY) : Math.max(delayHide, TIME_DELAY))
  }

  React.useEffect(() => {
    setActualWrapper(visible)
  }, [visible])

  React.useEffect(() => {
    if (!referencePosition || !popupPosition) {
      return
    }
    let topTo = 0
    let leftTo = 0
    if (placement.startsWith('top')) {
      topTo = referencePosition.top - popupPosition.bottom
    } else if (placement.startsWith('bottom')) {
      topTo = referencePosition.bottom - popupPosition.top
    } else if (placement.startsWith('left')) {
      leftTo = referencePosition.left - popupPosition.right
    } else if (placement.startsWith('right')) {
      leftTo = referencePosition.right - popupPosition.left
    }
    if (placement.endsWith('Left')) {
      leftTo = referencePosition.left - popupPosition.left
    } else if (placement.endsWith('Right')) {
      leftTo = referencePosition.right - popupPosition.right
    } else if (placement.endsWith('Top')) {
      topTo = referencePosition.top - popupPosition.top
    } else if (placement.endsWith('Bottom')) {
      topTo = referencePosition.bottom - popupPosition.bottom
    }
    if (placement === 'top' || placement === 'bottom') {
      leftTo = (referencePosition.left + referencePosition.right - popupPosition.right - popupPosition.left) / 2
    } else if (placement === 'left' || placement === 'right') {
      topTo = (referencePosition.top + referencePosition.bottom - popupPosition.top - popupPosition.bottom) / 2
    }

    // 如果使用绝对定位，必须考虑已经有的位移量，
    // transform定位，不会改变元素的原始位置
    if (!isTransformSupport) {
      topTo += top
      leftTo += left
    }
    topTo = Math.floor(topTo)
    leftTo = Math.floor(leftTo)
    if (topTo !== top) {
      setTop(topTo)
    }
    if (leftTo !== left) {
      setLeft(leftTo)
    }
  }, [placement, popupPosition, referencePosition])

  useUpdate(() => {
    onVisibleChange && onVisibleChange(actualVisible)
  }, [actualVisible])

  const arrowCenter = React.useMemo(() => {
    let x = 0
    let y = 0
    if (!referencePosition || !popupPosition) {
      return { x, y }
    }

    const popupHeight = popupPosition.bottom - popupPosition.top
    const popupWidth = popupPosition.right - popupPosition.left
    const referenceHeight = referencePosition.bottom - referencePosition.top
    const referenceWidth = referencePosition.right - referencePosition.left

    if (placement.startsWith('top')) {
      y = popupHeight - offset
    } else if (placement.startsWith('bottom')) {
      y = 0
    } else if (placement.startsWith('left')) {
      x = popupWidth - offset
    } else if (placement.startsWith('right')) {
      x = 0
    }

    if (placement.endsWith('Left')) {
      x = Math.min(popupWidth, referenceWidth) / 2
    } else if (placement.endsWith('Right')) {
      x = popupWidth - Math.min(popupWidth, referenceWidth) / 2
    } else if (placement.endsWith('Top')) {
      y = Math.min(popupHeight, referenceHeight) / 2
    } else if (placement.endsWith('Bottom')) {
      y = popupHeight - Math.min(popupHeight, referenceHeight) / 2
    }

    if (placement === 'top' || placement === 'bottom') {
      x = popupWidth / 2
    } else if (placement === 'left' || placement === 'right') {
      y = popupHeight / 2
    }

    return {
      x: Math.floor(x),
      y: Math.floor(y)
    }

  }, [popupPosition, referencePosition, left, top, placement, offset])

  const popupStyle = React.useMemo(() => {

    const style: React.CSSProperties = {
      position: 'absolute'
    }

    if (isTransformSupport) {
      style.left = 0
      style.top = 0
      style.transform = `translate(${left}px,${top}px)`
      style.willChange = 'transform'
    } else {
      style.left = left
      style.top = top
      style.willChange = 'left, top'
    }

    if (placement.startsWith('top')) {
      style.paddingBottom = offset
    } else if (placement.startsWith('bottom')) {
      style.paddingTop = offset
    } else if (placement.startsWith('left')) {
      style.paddingRight = offset
    } else {
      style.paddingLeft = offset
    }
    if (actualVisible) {
      style.zIndex = increaseZIndex()
    }
    return style
  }, [left, top, offset, actualVisible])

  const setPosition = React.useCallback(() => {
    if (!popupRef.current || !referenceRef.current) {
      return
    }
    const popupPos = getPosition(popupRef.current)
    const referencePos = getPosition(referenceRef.current)
    if (!equalObject(popupPos, popupPosition)) {
      setPopupPosition(popupPos)

    }
    if (!equalObject(referencePos, referencePosition)) {
      setReferencePosition(referencePos)
    }

  }, [popupRef, referenceRef])

  React.useEffect(() => {
    const rePosition = () => {
      if (actualVisible) {
        setPosition()
      }
    }
    on('resize', rePosition)
    on('scroll', rePosition)
    return () => {
      off('scroll', rePosition)
      off('resize', rePosition)
    }
  }, [actualVisible, setPosition])

  const onMouseEnter = () => {
    // 如果是从popup移动过来，需要先清除popup的定时关闭
    clearTimeout(delayTimerRef.current!)
    if (trigger === 'hover') {
      setActualWrapper(true)
    }
  }
  const onMouseLeave = () => {
    if (trigger === 'hover') {
      setActualWrapper(false)
    }
  }

  const onFocus = () => {
    if (trigger === 'focus') {
      setActualWrapper(true)
    }
  }

  const onBlur = () => {
    if (trigger === 'focus') {
      setActualWrapper(false)
    }
  }

  const onContextMenu = () => {
    if (trigger === 'contextMenu') {
      setActualWrapper(true)
    }
  }

  const onPopupMouseEnter = () => {
    clearTimeout(delayTimerRef.current!)
    if (!allowPopupEnter) {
      setActualWrapper(false)
    }
  }

  const onPopupMouseLeave = () => {
    if (trigger === 'hover') {
      setActualWrapper(false)
    }
  }

  const onReferenceClick = () => {
    if (trigger === 'click') {
      setActualWrapper(true)
    }
  }

  const onClickOutside = (e: MouseEvent) => {
    if (trigger === 'click' || trigger === 'contextMenu') {
      if (e.target instanceof HTMLElement && !include(popupRef.current!, e.target)) {
        setActualWrapper(false)
      }
    }
  }

  const transitionClass = React.useMemo(() => {
    if (typeof transitionName === 'function') {
      return transitionName(placement)
    }
    return transitionName
  }, [transitionName, placement])

  const overlayClass = React.useMemo(() => {
    if (typeof overlayClassName === 'function') {
      return overlayClassName(placement)
    }
    return overlayClassName
  }, [overlayClassName, placement])

  const overlayStyleObj: React.CSSProperties = React.useMemo(() => {
    let style
    if (typeof overlayStyle === 'function') {
      style = overlayStyle(placement)
    } else {
      style = overlayStyle
    }
    return {
      position: 'relative',
      ...style
    }
  }, [overlayStyle, placement])

  useClickOutside(referenceRef, onClickOutside)

  const portal = ReactDOM.createPortal((
    <div
      ref={popupRef}
      style={popupStyle}
      onMouseEnter={onPopupMouseEnter}
      onMouseLeave={onPopupMouseLeave}
    >
      <CssTransition
        forceRender={true}
        isAppear={true}
        show={actualVisible}
        classNames={transitionClass}
        beforeEnter={setPosition}
        beforeAppear={setPosition}
      >
        <div className={overlayClass} style={overlayStyleObj}>
          {arrow && arrow(placement, arrowCenter)}
          {popup(placement)}
        </div>
      </CssTransition>
    </div>
  ), getPopupContainer())

  const childrenNode = React.useMemo(() => {
    const { onBlur: _onBlur, onClick: _onClick, onContextMenu: _onContextMenu, onFocus: _onFocus, onMouseEnter: _onMouseEnter, onMouseLeave: _onMouseLeave, ...others } = children.props
    return React.cloneElement(children, {
      onBlur: mergeEvents(onBlur, _onBlur),
      onClick: mergeEvents(onReferenceClick, _onClick),
      onContextMenu: mergeEvents(onContextMenu, _onContextMenu),
      onFocus: mergeEvents(onFocus, _onFocus),
      onMouseEnter: mergeEvents(onMouseEnter, _onMouseEnter),
      onMouseLeave: mergeEvents(onMouseLeave, _onMouseLeave),
      ref: referenceRef,
      ...others
    })
  }, [children, onBlur, onReferenceClick, onContextMenu, onFocus, onMouseEnter, onMouseLeave, referenceRef])

  return (
    <>
      {childrenNode}
      {needMount && portal}
    </>
  )
}

Popper.displayName = displayName

Popper.propTypes = {
  allowPopupEnter: PropTypes.bool,
  arrow: PropTypes.func,
  children: PropTypes.element.isRequired,
  delayHide: PropTypes.number,
  delayShow: PropTypes.number,
  getPopupContainer: PropTypes.func,
  onVisibleChange: PropTypes.func,
  overlayClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  overlayStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  placement: PropTypes.oneOf([
    'top',
    'left',
    'right',
    'bottom',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'leftTop',
    'leftBottom',
    'rightTop',
    'rightBottom']),
  popup: PropTypes.func.isRequired,
  transitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    appear: PropTypes.string,
    appearActive: PropTypes.string,
    appearTo: PropTypes.string,
    enter: PropTypes.string.isRequired,
    enterActive: PropTypes.string.isRequired,
    enterTo: PropTypes.string.isRequired,
    leave: PropTypes.string.isRequired,
    leaveActive: PropTypes.string.isRequired,
    leaveTo: PropTypes.string.isRequired
  }), PropTypes.func]),
  trigger: PropTypes.oneOf(['hover', 'focus', 'click', 'contextMenu', 'custom']),
  visible: PropTypes.bool
}

export default Popper

const equalObject = (left: any, right: any) => {
  if (!left || !right) {
    return false
  }
  for (const key of Object.keys(left)) {
    if (left[key] !== right[key]) {
      return false
    }
  }
  return true
}
