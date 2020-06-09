/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M304 32L16 320l176 176 288-288V32zm80 128a32 32 0 1132-32 32 32 0 01-32 32z'/>
    </svg>
)

const PricetagSharp = createIcon(svgElement)

PricetagSharp.displayName = 'PricetagSharp'

export { IconProps } from '../base/createIcon'

export default PricetagSharp
