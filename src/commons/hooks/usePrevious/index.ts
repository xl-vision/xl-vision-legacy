import { useRef, useEffect } from 'react'

const usePrevious = <T>(value: T) => {
  const newRef = useRef<T>()
  const oldRef = useRef<T>()

  useEffect(() => {
    if (newRef.current !== value) {
      oldRef.current = newRef.current
      newRef.current = value
    }
  }, [value])

  return oldRef.current
}

export default usePrevious
