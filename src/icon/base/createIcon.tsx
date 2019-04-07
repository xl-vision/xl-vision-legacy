import * as React from 'react'
import BaseIcon from './base-icon'

export interface IconProps {
  className?: string
  color?: string
  onClick?: React.MouseEventHandler
  rotate?: number
  size?: number | string
  spin?: boolean
  style?: React.CSSProperties
}

const createIcon = (
  svgElement: React.ReactElement<React.SVGProps<SVGSVGElement>>
) => {
  const fn: React.FunctionComponent<IconProps> = props => {
    return <BaseIcon {...props}>{svgElement}</BaseIcon>
  }
  return fn
}

export default createIcon
