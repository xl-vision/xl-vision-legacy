import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import Tooltip, { TooltipProps } from '../tooltip'

export interface PopoverProps extends TooltipProps {
  content: React.ReactNode
  title: React.ReactNode
}

const Popover: React.FunctionComponent<PopoverProps> = (props) => {
  const { content, title, prefixCls = `${namePrefix}-popover`, ...others } = props

  const contentNode = (
    <>
      <div className={`${prefixCls}__title`}>{title}</div>
      <div className={`${prefixCls}__content`}>{content}</div>
    </>
  )

  return <Tooltip {...others} content={contentNode} prefixCls={prefixCls} />
}

Popover.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired
}

export default Popover
