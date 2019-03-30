import * as React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg{{each message.attrs}} {{$index}}='{{$value}}'{{/each}}>
        {{each message.children}}<{{$value.type}}{{each $value.attrs}} {{$index}}='{{$value}}'{{/each}}/>{{/each}}
    </svg>
)

const {{name}} = createIcon(svgElement)

export { IconProps } from '../base/base-icon'

export default {{name}}
