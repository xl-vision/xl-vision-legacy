/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M144 448L368 256 144 64 144 448z'/>
    </svg>
)

const CaretForwardSharp = createIcon(svgElement)

CaretForwardSharp.displayName = 'CaretForwardSharp'

export { IconProps } from '../base/createIcon'

export default CaretForwardSharp
