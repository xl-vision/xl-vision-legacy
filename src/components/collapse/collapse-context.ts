import React from 'react'
import { voidFn } from '../commons/utils/function'

export interface CollapseContextProps {
  isShow: (name: string) => boolean
  clickCallback: (name: string) => void
  unregister: (name: string) => void
  register: (name: string) => void
}

const CollapseContext = React.createContext<CollapseContextProps>({
  isShow: () => false,
  clickCallback: voidFn,
  unregister: voidFn,
  register: voidFn
})

export default CollapseContext
