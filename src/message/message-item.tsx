import React from 'react'
import { namePrefix } from '../commons/config'
import FasSpinner from '../icon/icons/fas-spinner'
import CssTransition from '../css-transition'

export interface MessageItemProps {
  prefixCls?: string
  icon?: React.ReactNode
  loading?: boolean
  content: React.ReactNode
  visible?: boolean
}

const MessageItem: React.FunctionComponent<MessageItemProps> = props => {
  const { prefixCls = `${namePrefix}-message-item`, icon, loading, content, visible = true } = props

  const iconNode = loading ? FasSpinner : icon

  return (
    <CssTransition show={visible} classNames={`${prefixCls}--fade`}>
      <div className={prefixCls}>
        {iconNode && <div className={`${prefixCls}__icon`}>{iconNode}</div>}
        <div className={`${prefixCls}__content`}>{content}</div>
      </div>
    </CssTransition>
  )
}

export default MessageItem
