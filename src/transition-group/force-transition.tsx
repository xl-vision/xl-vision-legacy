import React from 'react'
import CssTransition, { CssTransitionProps } from '../css-transition'

/**
 * 强制触发enter或leave动作
 */
const ForceEnterTransition: React.FunctionComponent<CssTransitionProps> = props => {
  const { show, children, ...others } = props

  const [showState, setShowState] = React.useState(!show)

  React.useEffect(() => {
    setShowState(prev => !prev)
  }, [])

  return (
    <CssTransition {...others} show={showState}>
      {children}
    </CssTransition>
  )
}

export default ForceEnterTransition
