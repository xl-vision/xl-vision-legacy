import { createContext } from 'react'

interface PopperContextProp {
  addCloseHandler: (closeHandler: () => void) => void
  removeCloseHandler: (closeHandler: () => void) => void
}

export default createContext<PopperContextProp>({
  addCloseHandler: () => {},
  removeCloseHandler: () => {}
})
