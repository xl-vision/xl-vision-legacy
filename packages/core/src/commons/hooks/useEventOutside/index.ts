import { RefObject, useCallback, useEffect } from 'react'
import { include } from '../../utils/dom'
import { off, on } from '../../utils/event'

const useEventOutside = <K extends keyof WindowEventMap>(
  eventType: K,
  ref: RefObject<HTMLElement>,
  handler: (e: WindowEventMap[K]) => void,
  capture?: boolean
) => {
  const fn = useCallback(
    (e: WindowEventMap[K]) => {
      const el = ref.current
      if (!el) {
        return
      }
      if (e.target instanceof HTMLElement && !include(el, e.target)) {
        handler(e)
      }
    },
    [handler, ref]
  )
  useEffect(() => {
    on(window, eventType, fn, {
      capture
    })
    return () => {
      off(window, eventType, fn, {
        capture
      })
    }
  }, [eventType, fn, capture])
}

export default useEventOutside
