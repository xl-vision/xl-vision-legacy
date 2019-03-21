import * as React from 'react'
import BaseIcon from '../base/baseIcon'

interface IconProps {
    size?: number | string
    color?: string
    spin?: boolean
    rotate?: number
    style?: React.CSSProperties
    className?: string
}



const {{name}}: React.FunctionComponent<IconProps> = props => {
    return (
        <BaseIcon {...props}>
            <svg{{each message.attrs}} {{$index}}='{{$value}}'{{/each}}>
                {{each message.children}}<{{$value.type}}{{each $value.attrs}} {{$index}}='{{$value}}'{{/each}}/>{{/each}}
            </svg>
        </BaseIcon>
    )
}

export default {{name}}
