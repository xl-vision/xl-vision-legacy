import { RefObject, useCallback, useEffect } from 'react'
import { include } from '../../utils/dom'
import { off, on } from '../../utils/event'

const useEventOutside = <K extends keyof WindowEventMap>(
  eventType: K,
  ref: RefObject<HTMLElement>,
  handler: (e: Event) => void
) => {
  const fn = useCallback(
    (e: Event) => {
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
    on(eventType, fn)
    return () => {
      off(eventType, fn)
    }
  }, [eventType, fn])
}

export default useEventOutside
