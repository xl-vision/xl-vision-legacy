import React from 'react'
import PropTypes from 'prop-types'
import createTheme, { BaseTheme } from '../styles/createTheme'
import ThemeContext from '../styles/ThemeContext'

export interface ThemeProviderProps {
  theme?: BaseTheme
  children: React.ReactNode
}

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = (props) => {
  const { theme, children } = props

  const allTheme = React.useMemo(() => createTheme(theme), [theme])

  return <ThemeContext.Provider value={allTheme}>{children}</ThemeContext.Provider>
}

ThemeProvider.displayName = 'ThemeProvider'

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node.isRequired
}

export default ThemeProvider
