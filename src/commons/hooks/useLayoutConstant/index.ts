import { useRef, useCallback } from 'react'
import useLayoutEffect from '../../utils/useLayoutEffect'

/**
 * 将给定的值常量化,
 * 处理useConstant无法在useLayoutEffect中及时更新
 * @param value
 */
const useLayoutConstant = <T>(value: T) => {
  const valueRef = useRef(value)
  const getValue = useCallback(() => {
    return valueRef.current
  }, [])
  useLayoutEffect(() => {
    valueRef.current = value
  }, [value])

  return getValue
}

export default useLayoutConstant
