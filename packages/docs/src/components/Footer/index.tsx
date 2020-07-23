import React from 'react'
import { createUseStyles } from '@xl-vision/core'

const Footer: React.FunctionComponent<Record<string, unknown>> = () => {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <span className={classes.span}>Copyright By Rhys Xia</span>
    </footer>
  )
}

export default Footer

const useStyles = createUseStyles((theme) => {
  return {
    root: {
      padding: '1rem',
      textAlign: 'center',
      borderTop: `1px solid ${theme.color.getContrastColor().divider}`
    },
    span: {}
  }
}, 'Footer')
