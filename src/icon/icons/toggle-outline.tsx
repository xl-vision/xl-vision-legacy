/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <circle cx='368' cy='256' r='128' fill='none' strokeLinejoin='round' strokeWidth='32'/><rect width='480' height='256' x='16' y='128' fill='none' strokeLinejoin='round' strokeWidth='32' rx='128' ry='128'/>
    </svg>
)

const ToggleOutline = createIcon(svgElement)

ToggleOutline.displayName = 'ToggleOutline'

export { IconProps } from '../base/createIcon'

export default ToggleOutline
