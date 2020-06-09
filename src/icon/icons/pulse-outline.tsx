/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M48 320L112 320 176 64 240 448 304 224 336 320 400 320'/><circle cx='432' cy='320' r='32' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/>
    </svg>
)

const PulseOutline = createIcon(svgElement)

PulseOutline.displayName = 'PulseOutline'

export { IconProps } from '../base/createIcon'

export default PulseOutline
