/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='28' d='M288 193s12.18-6-32-6a80 80 0 1080 80'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='28' d='M256 149L296 189 256 229'/><path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z'/>
    </svg>
)

const RefreshCircleOutline = createIcon(svgElement)

RefreshCircleOutline.displayName = 'RefreshCircleOutline'

export { IconProps } from '../base/createIcon'

export default RefreshCircleOutline
