import { createContext } from 'react'

interface PopperContextProp {
  addCloseHandler: (closeHandler: () => void) => void
  removeCloseHandler: (closeHandler: () => void) => void
}

export default createContext<PopperContextProp>({
  // tslint:disable-next-line:no-empty
  addCloseHandler: () => {},
  // tslint:disable-next-line:no-empty
  removeCloseHandler: () => {}
})
