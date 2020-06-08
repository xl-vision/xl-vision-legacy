/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M296 352h28a28 28 0 0028-28v-28M352 216v-28a28 28 0 00-28-28h-28M216 352h-28a28 28 0 01-28-28v-28M160 216v-28a28 28 0 0128-28h28'/>
    </svg>
)

const ScanCircleOutline = createIcon(svgElement)

ScanCircleOutline.displayName = 'ScanCircleOutline'

export { IconProps } from '../base/createIcon'

export default ScanCircleOutline
