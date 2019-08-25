import React from 'react'

export interface DropdownContextState {
  close: () => void
  closeOnClick: boolean
}

const DropdownContext = React.createContext<DropdownContextState>({
  // tslint:disable-next-line:no-empty
  close: () => {},
  closeOnClick: false
})

export default DropdownContext
