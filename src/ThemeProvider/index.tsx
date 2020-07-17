import React from 'react'
import PropTypes from 'prop-types'
import createTheme, { Theme } from '../styles/createTheme'
import theming from '../styles/theming'

export type ThemeProviderProps = {
  theme: Theme
  children: React.ReactNode
}

const JssThemeProvider = theming.ThemeProvider

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = (props) => {
  const { children, theme: defaultTheme } = props
  const theme = React.useMemo(() => {
    return createTheme(defaultTheme)
  }, [defaultTheme])

  return <JssThemeProvider theme={theme}>{children}</JssThemeProvider>
}

ThemeProvider.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.node
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
