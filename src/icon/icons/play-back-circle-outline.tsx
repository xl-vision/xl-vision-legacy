/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z'/><path d='M117.23 246.7l114.45-69.14a10.78 10.78 0 0116.32 9.31v53.32l103.68-62.63a10.78 10.78 0 0116.32 9.31v138.26a10.78 10.78 0 01-16.32 9.31L248 271.81v53.32a10.78 10.78 0 01-16.32 9.31L117.23 265.3a10.89 10.89 0 010-18.6z'/>
    </svg>
)

const PlayBackCircleOutline = createIcon(svgElement)

PlayBackCircleOutline.displayName = 'PlayBackCircleOutline'

export { IconProps } from '../base/createIcon'

export default PlayBackCircleOutline
