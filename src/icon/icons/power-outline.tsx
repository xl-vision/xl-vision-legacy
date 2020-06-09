/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 64L256 256'/>
    </svg>
)

const PowerOutline = createIcon(svgElement)

PowerOutline.displayName = 'PowerOutline'

export { IconProps } from '../base/createIcon'

export default PowerOutline
