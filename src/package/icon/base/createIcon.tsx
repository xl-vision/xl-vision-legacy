import * as React from 'react'
import BaseIcon from '../base/baseIcon'

export interface IconProps {
    size?: number | string
    color?: string
    spin?: boolean
    rotate?: number
    style?: React.CSSProperties
    className?: string
    onClick?: React.MouseEventHandler<HTMLElement>
}

const createIcon = (svgElement: React.ReactElement) => {
    const fn = (props: IconProps) => {
        return (
            <BaseIcon {...props}>{svgElement}</BaseIcon>
        )
    }
    return fn
}

export default createIcon
