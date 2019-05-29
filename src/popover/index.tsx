import PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import Tooltip, { TooltipProps } from '../tooltip'

export interface PopoverProps extends TooltipProps {
  content: React.ReactNode
  title: React.ReactNode
}

export const displayName = `${namePrefix}-popover`

const Popover: React.FunctionComponent<PopoverProps> = props => {
  const {
    content,
    title,
    prefixCls = displayName,
    arrowSize = 14,
    ...others
  } = props

  const contentNode = React.useMemo(() => {
    return (
      <>
        <div className={`${prefixCls}__title`}>{title}</div>
        <div className={`${prefixCls}__body`}>{content}</div>
      </>
    )
  }, [content, title, prefixCls])

  return (
    <Tooltip
      content={contentNode}
      prefixCls={prefixCls}
      arrowSize={arrowSize}
      {...others}
    />
  )
}

Popover.displayName = displayName

Popover.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired
}

export default Popover
