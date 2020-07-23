import React from 'react'
import { createUseStyles } from '@xl-vision/styles'

const Footer: React.FunctionComponent<Record<string, unknown>> = () => {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <span>Copyright By Rhys Xia</span>
    </footer>
  )
}

export default Footer

const useStyles = createUseStyles({
  root: {
    backgroundColor: 'red'
  }
})
