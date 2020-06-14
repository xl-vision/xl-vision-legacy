import React from 'react'
import CssTransition, { CssTransitionProps } from '../CssTransition'
import useLayoutEffect from '../commons/utils/useLayoutEffect'

/**
 * 强制触发enter或leave动作
 */
const ForceTransition: React.FunctionComponent<CssTransitionProps> = (props) => {
  const { in: inProp, children, ...others } = props

  // 本组件主要处理进出动画，不涉及appear，阻止其干扰
  delete others.appear

  const [showState, setShowState] = React.useState(!inProp)

  useLayoutEffect(() => {
    console.log(1)
    setShowState((prev) => !prev)
  }, [])

  return (
    <CssTransition {...others} in={showState}>
      {children}
    </CssTransition>
  )
}

export default ForceTransition
