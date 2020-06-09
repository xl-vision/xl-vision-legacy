/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 262.62L256 342 336 262.62'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 330.97L256 170'/><path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z'/>
    </svg>
)

const ArrowDownCircleOutline = createIcon(svgElement)

ArrowDownCircleOutline.displayName = 'ArrowDownCircleOutline'

export { IconProps } from '../base/createIcon'

export default ArrowDownCircleOutline
