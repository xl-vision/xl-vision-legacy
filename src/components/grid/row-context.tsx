import * as React from 'react'

export interface RowContextState {
    gutter: number
}

const RowContext = React.createContext<RowContextState>({
    gutter: 0
})

export default RowContext
