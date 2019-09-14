import { createContext } from 'react'
import { voidFn } from '../../utils/function'

interface PopperContextProp {
  addCloseHandler: (closeHandler: () => void) => void
  removeCloseHandler: (closeHandler: () => void) => void
}

export default createContext<PopperContextProp>({
  addCloseHandler: voidFn,
  removeCloseHandler: voidFn
})
