/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='256' cy='256' r='26'/><circle cx='346' cy='256' r='26'/><circle cx='166' cy='256' r='26'/><path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/>
    </svg>
)

const EllipsisHorizontalCircleOutline = createIcon(svgElement)

EllipsisHorizontalCircleOutline.displayName = 'EllipsisHorizontalCircleOutline'

export { IconProps } from '../base/createIcon'

export default EllipsisHorizontalCircleOutline
