import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CssTransition, { CssTransitionClassNames } from '../../../css-transition'
import { namePrefix } from '../../config'
import useClickOutside from '../../hooks/useClickOutside'
import useUnmount from '../../hooks/useUnmount'
import useUpdate from '../../hooks/useUpdate'
import { getPosition } from '../../utils/dom'

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
  allowPopupEnter: boolean
  arrow?: (placement: Placement, center: { x: number, y: number }) => React.ReactElement<React.HTMLAttributes<HTMLElement>>
  // autoAdjustOverflow?: boolean,
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>,
  delayHide: number
  delayShow: number,
  getPopupContainer?: () => HTMLElement,
  onVisibleChange?: (visible: boolean) => void,
  overlayClassName?: string,
  overlayStyle?: React.CSSProperties,
  placement?: Placement
  popup: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  transitionName?: CssTransitionClassNames,
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | 'custom',
  visible?: boolean,
}

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
    delayShow = 0
  } = props

  const popupRef = React.useRef<HTMLDivElement>(null)
  const referenceRef = React.useRef<HTMLDivElement>(null)
  const delayTimerRef = React.useRef<NodeJS.Timeout>()

  const [actualVisible, setActualVisible] = React.useState(visible)

  const [popupPosition, setPopupPosition] = React.useState<{ bottom: number, left: number, right: number, top: number }>()
  const [referencePosition, setReferencePosition] = React.useState<{ bottom: number, left: number, right: number, top: number }>()

  const [left, setLeft] = React.useState(0)
  const [top, setTop] = React.useState(0)
  let isUnmount = false

  useUnmount(() => {
    isUnmount = true
  })

  const setActualWrapper = React.useCallback((isVisible: boolean) => {
    clearTimeout(delayTimerRef.current!)
    delayTimerRef.current = setTimeout(() => {
      if (!isUnmount) {
        setActualVisible(isVisible)
      }
    }, isVisible ? delayShow : delayHide)
  }, [isUnmount, delayShow, delayHide, delayTimerRef])

  React.useEffect(() => {
    if (visible !== actualVisible) {
      setActualWrapper(visible)
    }
  }, [visible])

  React.useEffect(() => {
    if (!referencePosition || !popupPosition) {
      return
    }
    if (placement.startsWith('top')) {
      const topTo = Math.floor(referencePosition.top - popupPosition.bottom + top)
      if (topTo !== top) {
        setTop(topTo)
      }
    } else if (placement.startsWith('bottom')) {
      const topTo = Math.floor(referencePosition.bottom - popupPosition.top + top)
      if (topTo !== top) {
        setTop(topTo)
      }
    } else if (placement.startsWith('left')) {
      const leftTo = Math.floor(referencePosition.left - popupPosition.right + left)
      if (leftTo !== left) {
        setLeft(leftTo)
      }
    } else if (placement.startsWith('right')) {
      const leftTo = Math.floor(referencePosition.right - popupPosition.left + left)
      if (leftTo !== left) {
        setLeft(leftTo)
      }
    }
    if (placement.endsWith('Left')) {
      const leftTo = Math.floor(referencePosition.left - popupPosition.left + left)
      if (leftTo !== left) {
        setLeft(leftTo)
      }
    } else if (placement.endsWith('Right')) {
      const leftTo = Math.floor(referencePosition.right - popupPosition.right + left)
      if (leftTo !== left) {
        setLeft(leftTo)
      }
    } else if (placement.endsWith('Top')) {
      const topTo = Math.floor(referencePosition.top - popupPosition.top + top)
      if (topTo !== top) {
        setTop(topTo)
      }
    } else if (placement.endsWith('Bottom')) {
      const topTo = Math.floor(referencePosition.bottom - popupPosition.bottom + top)
      if (topTo !== top) {
        setTop(topTo)
      }
    }
    if (placement === 'top' || placement === 'bottom') {
      const leftTo = Math.floor((referencePosition.left + referencePosition.right - popupPosition.right - popupPosition.left) / 2 + left)
      if (leftTo !== left) {
        setLeft(leftTo)
      }
    } else if (placement === 'left' || placement === 'right') {
      const topTo = Math.floor((referencePosition.top + referencePosition.bottom - popupPosition.top - popupPosition.bottom) / 2 + top)
      if (topTo !== top) {
        setTop(topTo)
      }
    }
  }, [placement, popupPosition, referencePosition])

  useUpdate(() => {
    onVisibleChange && onVisibleChange(actualVisible)
  }, [actualVisible])

  const arrowCenter = React.useMemo(() => {
    if (!referencePosition || !popupPosition) {
      return { x: 0, y: 0 }
    }
    const popupWidth = popupPosition.right - popupPosition.left
    const popupHeight = popupPosition.bottom - popupPosition.top
    const leftTo = Math.max(left, referencePosition.left)
    const rightTo = Math.min(left + popupWidth, referencePosition.right)
    const topTo = Math.max(top, referencePosition.top)
    const bottomTo = Math.min(top + popupHeight, referencePosition.bottom)
    const middleTop = (topTo + bottomTo) / 2
    const middleLeft = (leftTo + rightTo) / 2

    const arrowLeftTo = Math.floor(middleLeft - left)
    const arrowTopTo = Math.floor(middleTop - top)

    return {
      x: arrowLeftTo,
      y: arrowTopTo
    }

  }, [popupPosition, referencePosition, left, top])

  const popupStyle: React.CSSProperties = React.useMemo(() => {
    return {
      ...overlayStyle,
      left,
      position: 'absolute',
      top
    }
  }, [top, left, overlayStyle])

  const popupBeforeEnter = React.useCallback(() => {
    if (!popupRef.current || !referenceRef.current) {
      return
    }
    const popupPos = getPosition(popupRef.current)
    const referencePos = getPosition(referenceRef.current)
    if (!compareObject(popupPos, popupPosition)) {
      setPopupPosition(popupPos)

    }
    if (!compareObject(referencePos, referencePosition)) {
      setReferencePosition(referencePos)
    }

  }, [popupRef, referenceRef])

  const onMouseEnter = React.useCallback(() => {
    if (trigger === 'hover') {
      setActualWrapper(true)
    }
  }, [trigger])
  const onMouseLeave = React.useCallback(() => {
    if (trigger === 'hover') {
      setActualWrapper(false)
    }
  }, [trigger, setActualWrapper])

  const onFocus = React.useCallback(() => {
    if (trigger === 'focus') {
      setActualWrapper(true)
    }
  }, [trigger, setActualWrapper])

  const onBlur = React.useCallback(() => {
    if (trigger === 'focus') {
      setActualWrapper(false)
    }
  }, [trigger, setActualWrapper])

  const onContextMenu = React.useCallback(() => {
    if (trigger === 'contextMenu') {
      setActualWrapper(true)
    }
  }, [trigger, setActualWrapper])

  const onPopupMouseEnter = React.useCallback(() => {
    if (!allowPopupEnter) {
      setActualWrapper(false)
    }
  }, [allowPopupEnter, setActualWrapper])

  const onReferenceClick = React.useCallback(() => {
    if (trigger === 'click') {
      setActualWrapper(true)
    }
  }, [trigger, setActualWrapper])

  const onClickOutside = React.useCallback(() => {
    if (trigger !== 'custom') {
      setActualWrapper(false)
    }
  }, [trigger, setActualWrapper])

  useClickOutside(referenceRef, onClickOutside)

  const portal = ReactDOM.createPortal((
    <div
      ref={popupRef}
      className={overlayClassName}
      style={popupStyle}
      onMouseEnter={onPopupMouseEnter}
    >
      <CssTransition show={actualVisible} classNames={transitionName} beforeEnter={popupBeforeEnter}>
        <div>
          {arrow && arrow(placement, arrowCenter)}
          {popup}
        </div>
      </CssTransition>
    </div>
  ), getPopupContainer())

  return (
    <div
      style={{
        display: 'inline-block'
      }}
      ref={referenceRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onClick={onReferenceClick}
      onBlur={onBlur}
      onContextMenu={onContextMenu}
    >
      {children}
      {portal}
    </div>
  )
}

Popper.displayName = displayName

export default Popper

const compareObject = (left: any, right: any) => {
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
