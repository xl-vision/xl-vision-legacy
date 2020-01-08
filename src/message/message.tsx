import React from 'react'
import { namePrefix } from '../commons/config'
import TransitionGroup from '../transition-group'
import { TransitionProps } from '../transition'

export interface MessageProps {
  prefixCls?: string
  children: React.ReactElement<TransitionProps>[]
}

const Message: React.FunctionComponent<MessageProps> = props => {
  const { prefixCls = `${namePrefix}-message`, children } = props
  return (
    <div className={prefixCls}>
      <TransitionGroup>{children}</TransitionGroup>
    </div>
  )
}

export default Message
