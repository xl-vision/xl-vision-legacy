import * as React from 'react'
import BaseIcon from './base-icon'

export interface IconProps {
  className?: string
  color?: string
  rotate?: number
  size?: number | string
  spin?: boolean
}

const createIcon = (
  svgElement: React.ReactElement<React.SVGProps<SVGSVGElement>>
) => {
  const fn = (props: IconProps) => {
    return <BaseIcon {...props}>{svgElement}</BaseIcon>
  }
  return fn
}

export default createIcon
