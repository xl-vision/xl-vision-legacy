/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='416' height='352' x='48' y='80' fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/><circle cx='336' cy='176' r='32' fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368'/>
    </svg>
)

const ImageOutline = createIcon(svgElement)

ImageOutline.displayName = 'ImageOutline'

export { IconProps } from '../base/createIcon'

export default ImageOutline
