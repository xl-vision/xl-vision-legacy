import React from 'react'
import { voidFn } from '@xl-vision/commons'

export type ColorContextProps = {
  setDark: (dark: boolean | ((prev: boolean) => boolean)) => void
  dark: boolean
}

const ColorContext = React.createContext<ColorContextProps>({
  setDark: voidFn,
  dark: false
})

export default ColorContext
