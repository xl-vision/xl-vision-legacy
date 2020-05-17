import React from 'react'
import { voidFn } from '../commons/utils/function'

export interface DropdownContextState {
  close: () => void
  closeOnClick: boolean
}

const DropdownContext = React.createContext<DropdownContextState>({
  close: voidFn,
  closeOnClick: false
})

export default DropdownContext
