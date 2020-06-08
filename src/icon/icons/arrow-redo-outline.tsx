/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' d='M448 256L272 88v96C103.57 184 64 304.77 64 424c48.61-62.24 91.6-96 208-96v96z'/>
    </svg>
)

const ArrowRedoOutline = createIcon(svgElement)

ArrowRedoOutline.displayName = 'ArrowRedoOutline'

export { IconProps } from '../base/createIcon'

export default ArrowRedoOutline
