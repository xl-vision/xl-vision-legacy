/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-{{filename}}`
const svgElement = (
    <svg{{#each node.attrs}} {{@key}}='{{this}}'{{/each}}>
        {{#each node.children}}<{{type}}{{#each attrs}} {{@key}}='{{this}}'{{/each}}/>{{/each}}
    </svg>
)

const {{name}} = createIcon(svgElement)

{{name}}.displayName = displayName

export { IconProps } from '../base/createIcon'

export default {{name}}
