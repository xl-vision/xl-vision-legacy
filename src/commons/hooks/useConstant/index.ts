import { useRef, useCallback, useEffect } from 'react'

/**
 * 将给定的值常量化
 * @param value
 */
const useConstant = <T>(value: T) => {
  const valueRef = useRef(value)
  const getValue = useCallback(() => {
    return valueRef.current
  }, [])
  useEffect(() => {
    valueRef.current = value
  }, [value])

  return getValue
}

export default useConstant
