/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinejoin='round' strokeWidth='32' d='M336 320L32 320 184 48 336 320z'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M265.32 194.51A144 144 0 11192 320'/>
    </svg>
)

const ShapesOutline = createIcon(svgElement)

ShapesOutline.displayName = 'ShapesOutline'

export { IconProps } from '../base/createIcon'

export default ShapesOutline
