import React from 'react'
import { namePrefix } from '../commons/config'
import FasSpinner from '../icon/icons/fas-spinner'
import CssTransition from '../css-transition'

export interface MessageItemProps {
  prefixCls?: string
  icon?: React.ReactNode
  loading?: boolean
  content: React.ReactNode
}

const MessageItem: React.FunctionComponent<MessageItemProps> = props => {
  const { prefixCls = `${namePrefix}-message-item`, icon, loading, content } = props

  const iconNode = loading ? FasSpinner : icon

  return (
    <div className={prefixCls}>
      {iconNode && <div className={`${prefixCls}__icon`}>{iconNode}</div>}
      <div className={`${prefixCls}__content`}>{content}</div>
    </div>
  )
}

export default MessageItem
