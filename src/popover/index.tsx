import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import Tooltip, { TooltipProps } from '../tooltip'

export interface PopoverProps extends TooltipProps {
  content: React.ReactNode
  title: React.ReactNode
}

export const displayName = `${namePrefix}-popover`

const Popover: React.FunctionComponent<PopoverProps> = props => {
  const { content, title, prefixCls = displayName, ...others } = props

  const contentNode = React.useMemo(() => {
    return (
      <>
        <div className={`${prefixCls}__title`}>{title}</div>
        <div className={`${prefixCls}__content`}>{content}</div>
      </>
    )
  }, [content, title, prefixCls])

  return <Tooltip content={contentNode} prefixCls={prefixCls} {...others} />
}

Popover.displayName = displayName

Popover.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired
}

export default Popover
