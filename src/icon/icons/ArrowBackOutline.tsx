/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M244 400L100 256 244 112'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M120 256L412 256'/>
    </svg>
)

const ArrowBackOutline = createIcon(svgElement)

ArrowBackOutline.displayName = 'ArrowBackOutline'

export { IconProps } from '../base/createIcon'

export default ArrowBackOutline
