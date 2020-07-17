import React from 'react'
import { createTheming } from 'react-jss'
import createTheme from './createTheme'

const theme = createTheme()

const context = React.createContext(theme)

export default createTheming(context)
