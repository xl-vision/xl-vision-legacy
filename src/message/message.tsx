import React from 'react'
import { namePrefix } from '../commons/config'

export interface MessageProps {
  prefixCls?: string
  children: React.ReactNode
}

const Message: React.FunctionComponent<MessageProps> = props => {
  const { prefixCls = `${namePrefix}-message`, children } = props
  return <div className={prefixCls}>{children}</div>
}

export default Message
