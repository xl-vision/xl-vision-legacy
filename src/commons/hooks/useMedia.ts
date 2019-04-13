import { useState } from 'react'
import { throttle } from '../utils/function'
import useMount from './useMount'
import useUnmount from './useUnmount'

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

// tslint:disable
let enquire: any
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
  return {
    matches: false,
    media: mediaQuery,
    addListener() { },
    removeListener() { },
    onchange: null,
    addEventListener() { },
    removeEventListener() { },
    dispatchEvent() {
    return true
    }
  }
  }
  window.matchMedia = window.matchMedia || matchMediaPolyfill
  enquire = require('enquire.js')
}
// tslint:enable
const nativeMedia: any = {}
breakPointArray.forEach(it => {
  nativeMedia[it] = false
})
breakPointArray.forEach(breakPoint => {
  enquire.register(breakPointMap[breakPoint], {
    match: () => {
      nativeMedia[breakPoint] = true
    },
    unmatch: () => {
      nativeMedia[breakPoint] = false
    },
    // Keep a empty destory to avoid triggering unmatch when unregister
    // tslint:disable-next-line
    destroy() { }
  })
})

const useMedia = () => {
  const [media, setMedia] = useState<Record<BreakPoint, boolean>>({ ...nativeMedia })

  const resizeHandler = throttle(() => {
    for (const breakPoint of breakPointArray) {
      if (media[breakPoint] !== nativeMedia[breakPoint]) {
        setMedia(() => ({ ...nativeMedia }))
        return
      }
    }
  }, 250)

  useMount(() => {
    if (window) {
      window.addEventListener('resize', resizeHandler)
    }
  })
  useUnmount(() => {
    if (window) {
      window.removeEventListener('resize', resizeHandler)
    }
  })
  return media
}

export default useMedia
