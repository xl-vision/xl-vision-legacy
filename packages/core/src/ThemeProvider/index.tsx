import React from 'react'
import PropTypes from 'prop-types'
import createTheme, { Theme } from '../styles/createTheme'
import ThemeContext from '../styles/ThemeContext'

export interface ThemeProviderProps {
  theme: Theme
  children: React.ReactNode
}

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = (props) => {
  const { theme, children } = props

  const allTheme = React.useMemo(() => createTheme(theme), [theme])

  return <ThemeContext.Provider value={allTheme}>{children}</ThemeContext.Provider>
}

ThemeProvider.displayName = 'ThemeProvider'

ThemeProvider.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default ThemeProvider
