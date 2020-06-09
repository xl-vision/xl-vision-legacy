/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M479 447.77L268.43 56.64a8 8 0 00-14.09 0L43.73 447.77a8 8 0 007.05 11.79H472a8 8 0 007-11.79zm-197.62-36.29h-40v-40h40zm-4-63.92h-32l-6-160h44z'/>
    </svg>
)

const WarningSharp = createIcon(svgElement)

WarningSharp.displayName = 'WarningSharp'

export { IconProps } from '../base/createIcon'

export default WarningSharp
