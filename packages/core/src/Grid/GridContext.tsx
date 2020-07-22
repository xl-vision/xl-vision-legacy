import React from 'react'
import { BreakPoint } from './useMedia'

export interface RowContextState {
  gutter: number
  media: Partial<Record<BreakPoint, boolean>>
}

const RowContext = React.createContext<RowContextState>({
  gutter: 0,
  media: {}
})

export default RowContext
