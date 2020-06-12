/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='36' d='M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='36' d='M163.29 256L350.71 256'/>
    </svg>
)

const LinkOutline = createIcon(svgElement)

LinkOutline.displayName = 'LinkOutline'

export { IconProps } from '../base/createIcon'

export default LinkOutline