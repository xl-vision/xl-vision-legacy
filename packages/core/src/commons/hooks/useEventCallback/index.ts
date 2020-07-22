import { useRef, useCallback } from 'react'
import { useLayoutEffect } from '@xl-vision/commons'

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * 将给定的函数常量化
 * hook返回的方法只能在commit后调用，否则可能会出现获取到的方法不是最新的
 * @param value
 */
const useEventCallback = <P extends any, R extends any>(value: (...args: Array<P>) => R) => {
  const valueRef = useRef<(...args: Array<P>) => R>(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })
  const getValue = useCallback((...args: Array<P>) => valueRef.current(...args), [])
  useLayoutEffect(() => {
    valueRef.current = value
  })

  return getValue
}

export default useEventCallback
