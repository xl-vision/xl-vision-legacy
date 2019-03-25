import { useState } from 'react'
import useMount from '../../commons/hooks/useMount'
import useUnmount from '../../commons/hooks/useUnmount'
import { throttle } from '../../commons/utils'
import { BreakPoint, breakPointArray, breakPointMap } from '../common'

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
