import React from 'react'
import createTheme from './createTheme'

const theme = createTheme()

const ThemeContext = React.createContext(theme)

export default ThemeContext
