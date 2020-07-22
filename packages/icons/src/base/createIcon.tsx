import React from 'react'
import BaseIcon, { BaseIconProps } from './BaseIcon'

export interface IconProps {
  className?: string
  color?: string
  onClick?: React.MouseEventHandler
  rotate?: number
  size?: number | string
  style?: React.CSSProperties
}

const createIcon = (svgElement: React.ReactElement<React.HTMLAttributes<SVGSVGElement>>) => {
  const fn: React.FunctionComponent<IconProps> = React.forwardRef<HTMLSpanElement, BaseIconProps>(
    (props, ref) => {
      return (
        <BaseIcon {...props} ref={ref}>
          {svgElement}
        </BaseIcon>
      )
    }
  )
  fn.displayName = 'CreatedIcon'

  return fn
}

export default createIcon
