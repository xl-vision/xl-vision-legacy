/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M262.62 336L342 256 262.62 176'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M330.97 256L170 256'/><path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z'/>
    </svg>
)

const ArrowForwardCircleOutline = createIcon(svgElement)

ArrowForwardCircleOutline.displayName = 'ArrowForwardCircleOutline'

export { IconProps } from '../base/createIcon'

export default ArrowForwardCircleOutline
