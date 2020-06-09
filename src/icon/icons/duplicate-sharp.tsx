/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M112 80h288V56a24 24 0 00-24-24H66a34 34 0 00-34 34v310a24 24 0 0024 24h24V112a32 32 0 0132-32z'/><path d='M456 112H136a24 24 0 00-24 24v320a24 24 0 0024 24h320a24 24 0 0024-24V136a24 24 0 00-24-24zm-64 200h-80v80h-32v-80h-80v-32h80v-80h32v80h80z'/>
    </svg>
)

const DuplicateSharp = createIcon(svgElement)

DuplicateSharp.displayName = 'DuplicateSharp'

export { IconProps } from '../base/createIcon'

export default DuplicateSharp
