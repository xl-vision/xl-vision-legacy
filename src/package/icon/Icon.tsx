import * as React from 'react'
import BaseIcon from './base/baseIcon'

interface IconProps {
    size?: number | string
    color?: string
    spin?: boolean
    rotate?: number
    style?: React.CSSProperties
    className?: string
}



const Icon: React.FunctionComponent<IconProps> = props => {
    return (
        <BaseIcon {...props}>
            <svg viewBox="" >
                <path d=""/>
            </svg>
        </BaseIcon>
    )
}

export default Icon
