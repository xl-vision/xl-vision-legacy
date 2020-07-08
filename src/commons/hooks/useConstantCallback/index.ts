import { useRef, useCallback } from 'react'
import useLayoutEffect from '../useLayoutEffect'

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * 将给定的函数常量话
 * @param value
 */
const useConstantCallback = <P, R>(value: (...args: Array<P>) => R) => {
  const valueRef = useRef(value)
  const getValue = useCallback((...args) => valueRef.current(...args), [])
  useLayoutEffect(() => {
    valueRef.current = value
  }, [value])

  return getValue
}

export default useConstantCallback
