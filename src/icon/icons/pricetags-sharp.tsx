/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M288 16L0 304l176 176 288-288V16zm80 128a32 32 0 1132-32 32 32 0 01-32 32z'/><path d='M480 64L480 208 216.9 471.1 242 496 512 224 512 64 480 64z'/>
    </svg>
)

const PricetagsSharp = createIcon(svgElement)

PricetagsSharp.displayName = 'PricetagsSharp'

export { IconProps } from '../base/createIcon'

export default PricetagsSharp
