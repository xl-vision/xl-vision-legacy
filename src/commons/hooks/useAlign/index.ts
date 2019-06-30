import { CSSProperties, RefObject, useCallback, useEffect, useMemo, useState } from 'react'
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

const useAlign = (reference: RefObject<HTMLElement>, popup: RefObject<HTMLElement>, placement: Placement) => {
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [popupPosition, setPopupPosition] = useState<{ bottom: number, left: number, right: number, top: number }>()
  const [referencePosition, setReferencePosition] = useState<{ bottom: number, left: number, right: number, top: number }>()

  // 更新元素位置
  const updatePosition = useCallback(() => {
    if (!reference.current || !popup.current) {
      return
    }
    const popupPos = getPosition(popup.current)
    const referencePos = getPosition(reference.current)
    if (!equalObject(popupPos, popupPosition)) {
      setPopupPosition(popupPos)

    }
    if (!equalObject(referencePos, referencePosition)) {
      setReferencePosition(referencePos)
    }

  }, [reference, popup])

  // 计算popup需要距离top和left的距离
  useEffect(() => {
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

    topTo += top
    leftTo += left
    topTo = Math.floor(topTo)
    leftTo = Math.floor(leftTo)
    if (topTo !== top) {
      setTop(topTo)
    }
    if (leftTo !== left) {
      setLeft(leftTo)
    }
  }, [placement, popupPosition, referencePosition])

  const popupStyle = useMemo<CSSProperties>(() => {
    const style: React.CSSProperties = {
      left,
      position: 'absolute',
      top,
      willChange: 'left, top'
    }

    return style
  }, [left, top])

  return {
    popupPosition,
    popupStyle,
    referencePosition,
    updatePosition
  }
}

export default useAlign

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
