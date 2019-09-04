import { useRef, useCallback, useEffect } from 'react'

const useMountedState = () => {
  const ref = useRef(false)
  const get = useCallback(() => ref.current, [])
  useEffect(() => {
    ref.current = true
    return () => {
      ref.current = false
    }
  })
  return get
}

export default useMountedState
