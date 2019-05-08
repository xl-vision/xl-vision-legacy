import { useEffect, useState } from 'react'

const matchMedia = (query: string) => {
  if(typeof window === 'undefined') {
    return {
      // tslint:disable-next-line: no-empty
      addListener: () => {},
      matches: false,
      // tslint:disable-next-line: no-empty
      removeListener: () => {}
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
export const breakPointArray: BreakPoint[] = Object.keys(breakPointMap) as BreakPoint[]

const useMedia = () => {
  const [media, setMedia] = useState<Partial<Record<BreakPoint, boolean>>>({})

  useEffect(() => {
    const handlerMap: any = {}
    breakPointArray.forEach(breakPoint => {
      const query = breakPointMap[breakPoint]
      const mql = matchMedia(query)
      const onChange = () => {
        setMedia(prev => ({
          ...prev,
          [breakPoint]: mql.matches
        }))
      }
      onChange()

      handlerMap[breakPoint] = onChange
      mql.addListener(onChange)
    })
    return () => {
      breakPointArray.forEach(breakPoint => {
        const query = breakPointMap[breakPoint]
        matchMedia(query).removeListener(handlerMap[breakPoint])
      })
    }
  }, [])

  return media
}

export default useMedia
