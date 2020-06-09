/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M304 96L416 96 416 208'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M405.77 106.2L111.98 400.02'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M208 416L96 416 96 304'/>
    </svg>
)

const ResizeOutline = createIcon(svgElement)

ResizeOutline.displayName = 'ResizeOutline'

export { IconProps } from '../base/createIcon'

export default ResizeOutline
