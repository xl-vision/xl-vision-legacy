import React from 'react'

import classes from './index.module.scss'

const Footer: React.FunctionComponent<Record<string, unknown>> = () => {
  return (
    <footer className={classes.footer}>
      <span>Copyright By Rhys Xia</span>
    </footer>
  )
}

export default Footer
