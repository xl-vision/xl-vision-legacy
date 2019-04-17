import * as React from 'react'
import { BreakPoint } from './hooks/useMedia'

export interface RowContextState {
  gutter: number,
  media: Partial<Record<BreakPoint, boolean>>
}

const RowContext = React.createContext<RowContextState>({
  gutter: 0,
  media: {}
})

export default RowContext
