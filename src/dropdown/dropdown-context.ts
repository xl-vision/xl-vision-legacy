import React from 'react'

export interface DropdownContextState {
  close: () => void
  closeOnClick: boolean
}

const DropdownContext = React.createContext<DropdownContextState>({
  close: () => {},
  closeOnClick: false
})

export default DropdownContext
