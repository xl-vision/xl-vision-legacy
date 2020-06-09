/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M335.69 272h-161v-32h161V92a12 12 0 00-12-12h-280a12 12 0 00-12 12v328a12 12 0 0012 12h280a12 12 0 0012-12z'/><path d='M419.06 272L355.06 336 377.69 358.63 480.31 256 377.69 153.37 355.06 176 419.06 240 335.69 240 335.69 272 419.06 272z'/>
    </svg>
)

const ExitSharp = createIcon(svgElement)

ExitSharp.displayName = 'ExitSharp'

export { IconProps } from '../base/createIcon'

export default ExitSharp
