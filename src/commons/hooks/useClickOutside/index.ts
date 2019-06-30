import { RefObject, useCallback, useEffect } from 'react'
import { include } from '../../utils/dom'
import { off, on } from '../../utils/event'

const useClickOutside = (ref: RefObject<HTMLElement>, handler: (e: MouseEvent) => void) => {
  const fn = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) {
      return
    }
    if (e.target instanceof HTMLElement && !include(el, e.target)) {
      handler(e)
    }
  }, [handler, ref])
  useEffect(() => {
    on('click', fn)
    return () => {
      off('click', fn)
    }
  }, [fn])
}

export default useClickOutside
