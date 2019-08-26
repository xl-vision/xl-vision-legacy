import { RefObject, useCallback, useEffect, useRef } from 'react'
import { off, on } from '../../utils/event'

export interface DragPosition {
  x: number
  y: number
}

/**
 * @param ref
 * @param handler
 * @param allowOutView 是否允许鼠标超出指定元素范围
 */
const useOnMouseDrag = (
  ref: RefObject<HTMLElement>,
  handler: (start: DragPosition, end: DragPosition, isEnd: boolean) => void,
  allowOutView = false
) => {
  const startPosRef = useRef({ x: 0, y: 0 })
  const endPosRef = useRef({ x: 0, y: 0 })
  const isMoveRef = useRef(false)
  const isDragRef = useRef(false)

  const mousedownHandler = useCallback(
    (e: MouseEvent) => {
      isDragRef.current = true
      startPosRef.current = {
        x: e.pageX,
        y: e.pageY
      }
    },
    [isDragRef, startPosRef]
  )

  const mousemoveHandler = useCallback(
    (e: MouseEvent) => {
      if (isDragRef.current) {
        isMoveRef.current = true
        endPosRef.current = {
          x: e.pageX,
          y: e.pageY
        }
        handler(startPosRef.current, endPosRef.current, false)
      }
    },
    [isDragRef, startPosRef, endPosRef, handler]
  )

  const mouseupHandler = useCallback(
    (e: MouseEvent) => {
      if (isDragRef.current) {
        if (isMoveRef.current) {
          endPosRef.current = {
            x: e.pageX,
            y: e.pageY
          }
          handler(startPosRef.current, endPosRef.current, true)
        }

        isDragRef.current = false
        isMoveRef.current = false
      }
    },
    [isDragRef, startPosRef, endPosRef, handler]
  )

  useEffect(() => {
    const el = ref.current
    if (!el) {
      return
    }

    el.addEventListener('mousedown', mousedownHandler)

    if (allowOutView) {
      on('mousemove', mousemoveHandler)
      on('mouseup', mouseupHandler)
    } else {
      el.addEventListener('mousemove', mousemoveHandler)
      el.addEventListener('mouseup', mouseupHandler)
      el.addEventListener('mouseleave', mouseupHandler)
    }

    return () => {
      el.removeEventListener('mousedown', mousedownHandler)
      if (allowOutView) {
        off('mousemove', mousemoveHandler)
        off('mouseup', mouseupHandler)
      } else {
        el.removeEventListener('mousemove', mousemoveHandler)
        el.removeEventListener('mouseup', mouseupHandler)
        el.removeEventListener('mouseleave', mouseupHandler)
      }
    }
  }, [ref, mousedownHandler, mousemoveHandler, mouseupHandler, allowOutView])
}

export default useOnMouseDrag
