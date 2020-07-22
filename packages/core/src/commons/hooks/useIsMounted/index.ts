import { useRef, useCallback } from 'react'
import { useLayoutEffect } from '@xl-vision/commons'

const useIsMounted = () => {
  const ref = useRef(false)
  const get = useCallback(() => ref.current, [])
  useLayoutEffect(() => {
    ref.current = true
    return () => {
      ref.current = false
    }
  }, [])
  return get
}

export default useIsMounted
