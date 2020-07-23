import React from 'react'
import PropTypes from 'prop-types'
import createUseStyles from '../styles/createUseStyles'

export interface CssBaselineProps {
  children?: React.ReactNode
}

const CssBaseline: React.FunctionComponent<CssBaselineProps> = (props) => {
  const { children } = props
  useStyles()
  return <>{children}</>
}

CssBaseline.displayName = 'CssBaseline'

CssBaseline.propTypes = {
  children: PropTypes.node
}

export default CssBaseline

const useStyles = createUseStyles((theme) => {
  return {
    '@global': {
      html: {
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        // Change from `box-sizing: content-box` so that `width`
        // is not affected by `padding` or `border`.
        boxSizing: 'border-box'
      },
      body: {
        margin: 0,
        backgroundColor: theme.color.background,
        color: theme.color.getContrastColor().text.primary,
        ...theme.typography.body2
      },
      'strong, b': {
        fontWeight: theme.typography.fontWeight.bold
      }
    }
  }
}, 'CssBaseline')
