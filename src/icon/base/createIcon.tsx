import React from 'react'
import BaseIcon from './BaseIcon'

export interface IconProps {
  className?: string
  color?: string
  onClick?: React.MouseEventHandler
  rotate?: number
  size?: number | string
  spin?: boolean
  style?: React.CSSProperties
}

const createIcon = (svgElement: React.ReactElement<React.HTMLAttributes<SVGSVGElement>>) => {
  const fn: React.FunctionComponent<IconProps> = (props) => {
    return <BaseIcon {...props}>{svgElement}</BaseIcon>
  }
  return fn
}

export default createIcon
