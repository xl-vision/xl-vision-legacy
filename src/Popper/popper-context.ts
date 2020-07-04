import { createContext } from 'react'
import { voidFn } from '../commons/utils/function'

interface PopperContextProp {
  visible: boolean
  addCloseHandler: (closeHandler: () => void) => void
  removeCloseHandler: (closeHandler: () => void) => void
}

export default createContext<PopperContextProp>({
  addCloseHandler: voidFn,
  removeCloseHandler: voidFn,
  visible: true
})
