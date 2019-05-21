import { RefObject, useCallback, useEffect } from 'react'
import { include, off, on } from '../utils/dom'

const useClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
  const fn = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) {
      return
    }
    if (e.target instanceof HTMLElement && !include(el, e.target)) {
      handler()
    }
  }, [handler, ref.current])
  useEffect(() => {
    on('click', fn)
    return () => {
      off('click', fn)
    }
  }, [fn])
}

export default useClickOutside
