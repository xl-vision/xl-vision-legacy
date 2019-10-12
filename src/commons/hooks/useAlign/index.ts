import { CSSProperties, RefObject, useEffect, useMemo, useState } from 'react'
import { getPosition } from '../../utils/dom'
import { raf } from '../../utils/transition'

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

type Position = {
  bottom: number
  left: number
  right: number
  top: number
}

const useAlign = (
  reference: RefObject<HTMLElement>,
  popup: RefObject<HTMLElement>,
  placement: Placement
) => {
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [popupPosition, setPopupPosition] = useState<Position>()
  const [referencePosition, setReferencePosition] = useState<Position>()

  // 更新元素位置
  const updatePosition = useMemo(() => {
    const onceUpdate = () => {
      if (!reference.current || !popup.current) {
        return
      }
      const referencePos = getPosition(reference.current)
      const popupPos = getPosition(popup.current)
      setReferencePosition(prev => {
        if (equalObject(prev, referencePos)) {
          return prev
        }
        return referencePos
      })
      setPopupPosition(prev => {
        if (equalObject(prev, popupPos)) {
          return prev
        }
        return popupPos
      })
    }
    //需要更新两次，才能准确确定位置，主要在调整浏览器显示比例的时候有显著影响,具体原因还不清楚
    return () => {
      onceUpdate()
      raf(onceUpdate)
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
      leftTo =
        (referencePosition.left +
          referencePosition.right -
          popupPosition.right -
          popupPosition.left) /
        2
    } else if (placement === 'left' || placement === 'right') {
      topTo =
        (referencePosition.top +
          referencePosition.bottom -
          popupPosition.top -
          popupPosition.bottom) /
        2
    }
    topTo = Math.floor(topTo)
    leftTo = Math.floor(leftTo)
    setTop(prev => prev + topTo)
    setLeft(prev => prev + leftTo)
  }, [placement, popupPosition, referencePosition])

  const popupStyle = useMemo<CSSProperties>(() => {
    const style: CSSProperties = {
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

const equalObject = <T extends { [key: string]: number }>(left?: T, right?: T) => {
  if (!left || !right) {
    return false
  }

  if (left === right) {
    return true
  }

  for (const key of Object.keys(left)) {
    if (left[key] !== right[key]) {
      return false
    }
  }
  return true
}
