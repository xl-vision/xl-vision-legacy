/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M448 64L64 240.14h200a8 8 0 018 8V448z'/>
    </svg>
)

const NavigateOutline = createIcon(svgElement)

NavigateOutline.displayName = 'NavigateOutline'

export { IconProps } from '../base/createIcon'

export default NavigateOutline
