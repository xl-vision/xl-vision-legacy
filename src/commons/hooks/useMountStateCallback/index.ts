import { useRef, useCallback } from 'react'
import useLayoutEffect from '../../utils/useLayoutEffect'

const useMountStateCallback = () => {
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

export default useMountStateCallback
