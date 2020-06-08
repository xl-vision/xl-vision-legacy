/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg{{#each node.attrs}} {{toCamel @key}}='{{this}}'{{/each}}>
        {{#each node.children}}<{{type}}{{#each attrs}} {{toCamel @key}}='{{this}}'{{/each}}/>{{/each}}
    </svg>
)

const {{name}} = createIcon(svgElement)

{{name}}.displayName = '{{name}}'

export { IconProps } from '../base/createIcon'

export default {{name}}
