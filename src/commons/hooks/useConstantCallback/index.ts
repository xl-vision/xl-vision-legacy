import { useRef, useCallback } from 'react'
import useLayoutEffect from '../../utils/useLayoutEffect'

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * 将给定的函数常量话
 * @param value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useConstantCallback = <T extends (...args: any) => any>(value: T) => {
  const valueRef = useRef(value)
  const getValue = useCallback((...args) => valueRef.current(...args), [])
  useLayoutEffect(() => {
    valueRef.current = value
  }, [value])

  return getValue
}

export default useConstantCallback
