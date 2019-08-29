import React from 'react'

export interface CollapseContextProps {
  activeNames: string[]
  clickCallback: (key: string) => void
}

const CollapseContext = React.createContext<CollapseContextProps>({
  activeNames: [],
  clickCallback: () => {}
})

export default CollapseContext
