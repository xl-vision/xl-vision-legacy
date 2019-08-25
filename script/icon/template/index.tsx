/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-{{filename}}`
const svgElement = (
    <svg{{each message.attrs}} {{$index}}='{{$value}}'{{/each}}>
        {{each message.children}}<{{$value.type}}{{each $value.attrs}} {{$index}}='{{$value}}'{{/each}}/>{{/each}}
    </svg>
)

const {{name}} = createIcon(svgElement)

{{name}}.displayName = displayName

export { IconProps } from '../base/createIcon'

export default {{name}}
