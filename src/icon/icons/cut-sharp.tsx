/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M480 128h-48l-198.94 70.46-59.13-31.59a72.16 72.16 0 10-25.69 41.47l52.2 31.72L192 277l-43.64 26.76a71.74 71.74 0 1024.79 38L480 160zm-376.52 64a40 40 0 1140-40 40 40 0 01-40 40zm0 208a40 40 0 1140-40 40 40 0 01-40 40zm152-144a16 16 0 1116-16 16 16 0 01-16 16z'/><path d='M343.79 259.87L260.05 308.05 432 368 479.99 368 480 336 343.79 259.87z'/>
    </svg>
)

const CutSharp = createIcon(svgElement)

CutSharp.displayName = 'CutSharp'

export { IconProps } from '../base/createIcon'

export default CutSharp
