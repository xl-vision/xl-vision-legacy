import { useRef, useEffect } from 'react'

const usePrevious = <T>(value: T) => {
  const ref = useRef<T>()
  const ref2 = useRef<T>()

  useEffect(() => {
    if (ref.current !== value) {
      ref2.current = ref.current
      ref.current = value
    }
  }, [value])

  return ref2.current
}

export default usePrevious
