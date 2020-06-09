/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm96 224H160v-32h192z'/>
    </svg>
)

const RemoveCircleSharp = createIcon(svgElement)

RemoveCircleSharp.displayName = 'RemoveCircleSharp'

export { IconProps } from '../base/createIcon'

export default RemoveCircleSharp
