import React from 'react'
import { TransitionProps } from '../../../transition'

export interface ForceEnterTransition extends TransitionProps {
  [key: string]: any
}

/**
 * 强制触发enter动作，
 * 由于Transition组件在初始化时就把show设置为true，会无法触发enter动作，在一些场合我们需要强制触发enter动作。
 * 本组件的目的就是强制触发这一动作。
 */
const ForceEnterTransition: React.FunctionComponent<ForceEnterTransition> = props => {
  const { show: showProp, children, ...others } = props

  const [showState, setShowState] = React.useState(false)

  React.useEffect(() => {
    setShowState(true)
  }, [])

  const show = showProp === true ? showState : showProp
  return React.cloneElement(children, {
    show,
    ...others
  })
}

export default ForceEnterTransition
