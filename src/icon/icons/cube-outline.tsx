/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M448 341.37V170.61A32 32 0 00432.11 143l-152-88.46a47.94 47.94 0 00-48.24 0L79.89 143A32 32 0 0064 170.61v170.76A32 32 0 0079.89 369l152 88.46a48 48 0 0048.24 0l152-88.46A32 32 0 00448 341.37z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M69 153.99L256 263.99 443 153.99'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 463.99L256 263.99'/>
    </svg>
)

const CubeOutline = createIcon(svgElement)

CubeOutline.displayName = 'CubeOutline'

export { IconProps } from '../base/createIcon'

export default CubeOutline
