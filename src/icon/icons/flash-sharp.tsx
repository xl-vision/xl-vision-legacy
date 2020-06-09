/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M432 208H288l32-192L80 304h144l-32 192z'/>
    </svg>
)

const FlashSharp = createIcon(svgElement)

FlashSharp.displayName = 'FlashSharp'

export { IconProps } from '../base/createIcon'

export default FlashSharp
