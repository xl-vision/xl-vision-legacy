import { useEffect, useState } from 'react'
import { isServer } from '../commons/utils/env'
import { voidFn } from '../commons/utils/function'

const matchMedia = (query: string) => {
  if (isServer) {
    return {
      addListener: voidFn,
      matches: false,
      removeListener: voidFn
    }
  }
  return window.matchMedia(query)
}

export type BreakPoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

// 顺序不能颠倒
export const breakPointMap: Record<BreakPoint, string> = {
  xxl: '(min-width: 1600px)',
  // tslint:disable-next-line
  xl: '(min-width: 1200px)',
  lg: '(min-width: 992px)',
  md: '(min-width: 768px)',
  sm: '(min-width: 576px)',
  xs: '(min-width: 0)'
}
export const breakPointArray: Array<BreakPoint> = Object.keys(breakPointMap) as Array<BreakPoint>

const useMedia = () => {
  const [media, setMedia] = useState<Partial<Record<BreakPoint, boolean>>>({})

  useEffect(() => {
      const handlerMap: {
        [breakPoint: string]: {
          listener: EventListener
          mediaQuery: ReturnType<typeof matchMedia>
        }
      } = {}
      for (const breakPoint of breakPointArray) {
        const query = breakPointMap[breakPoint]
        const mql = matchMedia(query)
        const onChange = () => {
          setMedia((prev) => ({
            ...prev,
            [breakPoint]: mql.matches
          }))
        }
        handlerMap[breakPoint] = {
          listener: onChange,
          mediaQuery: mql
        }
        mql.addListener(onChange)
        onChange()
      }
      return () => {
        for (const breakPoint of breakPointArray) {
          const { mediaQuery, listener } = handlerMap[breakPoint]
          mediaQuery.removeListener(listener)
        }
      }
    }, []
  )

  return media
}

export default useMedia
