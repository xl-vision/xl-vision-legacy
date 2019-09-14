import React from 'react'
import { voidFn } from '../commons/utils/function'

export interface CollapseContextProps {
  activeNames: string[]
  clickCallback: (key: string) => void
}

const CollapseContext = React.createContext<CollapseContextProps>({
  activeNames: [],
  clickCallback: voidFn
})

export default CollapseContext
