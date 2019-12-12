import { useRef, useCallback, useEffect } from 'react'

/**
 * 将给定的值常量化
 * @param value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useConstant = (value: any) => {
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
