import * as React from 'react'

export interface CollapseContextProps {
  activeNames: string[]
  clickCallback: (key: string) => void
}

const CollapseContext = React.createContext<CollapseContextProps>({
  activeNames: [],
  // tslint:disable-next-line:no-empty
  clickCallback: () => {}
})

export default CollapseContext
