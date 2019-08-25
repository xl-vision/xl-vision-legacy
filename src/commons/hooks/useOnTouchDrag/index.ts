import { RefObject, useCallback, useEffect, useRef } from 'react'
import { include } from '../../utils/dom'
import { DragPosition } from '../useOnMouseDrag'

/**
 * @param ref
 * @param handler
 * @param allowOutView 是否允许鼠标超出指定元素范围
 */
const useOnTouchDrag = (
  ref: RefObject<HTMLElement>,
  handler: (start: DragPosition, end: DragPosition, isEnd: boolean) => void,
  allowOutView = false
) => {
  const startPosRef = useRef({ x: 0, y: 0 })
  const endPosRef = useRef({ x: 0, y: 0 })
  const isMoveRef = useRef(false)
  const isDragRef = useRef(false)

  const touchstartHandler = useCallback(
    (e: TouchEvent) => {
      isDragRef.current = true
      startPosRef.current = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }
    },
    [isDragRef, startPosRef]
  )

  const touchendHandler = useCallback(
    (e: TouchEvent) => {
      if (isDragRef.current) {
        if (isMoveRef.current) {
          if (e.touches.length > 0) {
            endPosRef.current = {
              x: e.touches[0].pageX,
              y: e.touches[0].pageY
            }
          }
          handler(startPosRef.current, endPosRef.current, true)
        }

        isDragRef.current = false
        isMoveRef.current = false
      }
    },
    [isDragRef, startPosRef, endPosRef, handler]
  )

  const touchmoveHandler = useCallback(
    (e: TouchEvent) => {
      if (isDragRef.current) {
        isMoveRef.current = true
        const touch = e.touches[0]
        endPosRef.current = {
          x: touch.pageX,
          y: touch.pageY
        }

        // 判断是否离开当前元素
        if (!allowOutView) {
          const el = document.elementFromPoint(touch.clientX, touch.clientY)
          if (!el || !include(e.currentTarget as HTMLElement, el)) {
            touchendHandler(e)
            return
          }
        }
        handler(startPosRef.current, endPosRef.current, false)
      }
    },
    [isDragRef, startPosRef, endPosRef, handler, touchendHandler]
  )

  useEffect(() => {
    const el = ref.current
    if (!el) {
      return
    }

    el.addEventListener('touchstart', touchstartHandler)
    el.addEventListener('touchmove', touchmoveHandler)
    el.addEventListener('touchend', touchendHandler)
    el.addEventListener('touchcancel', touchendHandler)

    return () => {
      el.removeEventListener('touchstart', touchstartHandler)
      el.removeEventListener('touchmove', touchmoveHandler)
      el.removeEventListener('touchend', touchendHandler)
      el.removeEventListener('touchcancel', touchendHandler)
    }
  }, [ref, touchmoveHandler, touchstartHandler, touchendHandler, allowOutView])
}

export default useOnTouchDrag
