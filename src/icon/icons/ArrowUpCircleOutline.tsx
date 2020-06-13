/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 249.38L256 170 336 249.38'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 181.03L256 342'/><path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/>
    </svg>
)

const ArrowUpCircleOutline = createIcon(svgElement)

ArrowUpCircleOutline.displayName = 'ArrowUpCircleOutline'

export { IconProps } from '../base/createIcon'

export default ArrowUpCircleOutline
