import * as React from 'react'
interface Options {
  gutter: number
}

export default React.createContext<Options>({ gutter: 0 })
