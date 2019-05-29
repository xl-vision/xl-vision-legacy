import * as React from 'react'
import { namePrefix } from '../commons/config'
import Tooltip, { TooltipProps } from '../tooltip'

export interface PopoverProps extends TooltipProps {
  content: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  title: React.ReactElement<React.HTMLAttributes<HTMLElement>>
}

export const displayName = `${namePrefix}-popover`

const Popover: React.FunctionComponent<PopoverProps> = props => {
  const {
    content,
    title,
    prefixCls = displayName,
    ...others
  } = props

  const contentNode = React.useMemo(() => {
    return (
      <div>
        <div>{title}</div>
        <div>{content}</div>
      </div>
    )
  }, [content, title])

  return (
    <Tooltip content={contentNode} prefixCls={prefixCls} {...others}/>
  )
}

Popover.displayName = displayName

export default Popover
