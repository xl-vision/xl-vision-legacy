import React from 'react'
import createTheme from './createTheme'

const theme = createTheme()

const context = React.createContext(theme)

export default context
