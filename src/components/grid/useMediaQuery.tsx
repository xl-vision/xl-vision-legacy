import * as React from 'react'
import { Breakpoint, responsiveMap } from './commons'

let enquire: any
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {
      },
      removeListener() {
      },
      onchange: null,
      addEventListener() {
      },
      removeEventListener() {
      },
      dispatchEvent() {
        return true
      }
    }
  }
  window.matchMedia = window.matchMedia || matchMediaPolyfill
  enquire = require('enquire.js')
}




export const useMediaQuery = () => {
  console.log(window)
  let flag = false
  const [mediaQuery, setMediaQuery] = React.useState<Partial<Record<Breakpoint, boolean>>>({})

  Object.keys(responsiveMap)
    .map((breakpoint: Breakpoint) => enquire.register(responsiveMap[breakpoint], {
      match: () => {
        if (!flag) {
          flag = true
          setMediaQuery(prevState => ({
            ...prevState,
            [breakpoint]: true
          }))
        }
      },
      unmatch: () => {
        // setMediaQuery(prevState => ({
        //   ...prevState,
        //   [breakpoint]: false
        // }))
      }
    }))
  return mediaQuery
}