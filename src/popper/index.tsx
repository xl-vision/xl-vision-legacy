import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { namePrefix } from '../commons/config'
import useUpdate from '../commons/hooks/useUpdate'
import { getPosition } from '../commons/utils/dom'
import CssTransition, { CssTransitionClassNames } from '../css-transition'

export type Placement =
  'top'
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
  arrow?: (placement: Placement, center: { left: number, top: number }) => React.ReactElement<React.HTMLAttributes<HTMLElement>>
  autoAdjustOverflow?: boolean,
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>,
  defaultVisible?: boolean,
  getPopupContainer?: () => HTMLElement,
  onVisibleChange?: (visible: boolean) => void,
  overlayClassName?: string,
  overlayStyle?: React.CSSProperties,
  placement?: Placement
  popup: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  transitionName?: CssTransitionClassNames,
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu',
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
    defaultVisible = false,
    allowPopupEnter = true,
    arrow
  } = props

  const popupRef = React.useRef<HTMLDivElement>(null)
  const referenceRef = React.useRef<HTMLDivElement>(null)

  const [visible, setVisible] = React.useState(defaultVisible)

  const [popupPosition, setPopupPosition] = React.useState<{ bottom: number, left: number, right: number, top: number }>()
  const [referencePosition, setChildrenPosition] = React.useState<{ bottom: number, left: number, right: number, top: number }>()

  const [left, setLeft] = React.useState(0)
  const [top, setTop] = React.useState(0)

  const popupBeforeEnter = React.useCallback(() => {
    const popupPos = getPosition(popupRef.current!)
    const referencePos = getPosition(referenceRef.current!)
    if (!compareObject(popupPos, popupPosition)) {
      setPopupPosition(popupPos)

    }
    if (!compareObject(referencePos, referencePosition)) {
      setChildrenPosition(referencePos)
    }

  }, [popupRef, referenceRef])

  useUpdate(() => {
    onVisibleChange && onVisibleChange(visible)
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

  const arrowCenter = React.useMemo(() => {
    if (!referencePosition || !popupPosition) {
      return { left: 0, top: 0 }
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
      left: arrowLeftTo,
      top: arrowTopTo
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

  const onMouseEnter = React.useCallback(() => {
    if (trigger === 'hover') {
      setVisible(true)
    }
  }, [trigger])
  const onMouseLeave = React.useCallback(() => {
    if (trigger === 'hover') {
      setVisible(false)
    }
  }, [trigger])

  const onPopupMouseEnter = React.useCallback(() => {
    if (!allowPopupEnter) {
      setVisible(false)
    }
  }, [allowPopupEnter])

  const portal = ReactDOM.createPortal((
    <div
      ref={popupRef}
      className={overlayClassName}
      style={popupStyle}
      onMouseEnter={onPopupMouseEnter}
    >
      <CssTransition show={visible} classNames={transitionName} beforeEnter={popupBeforeEnter}>
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
