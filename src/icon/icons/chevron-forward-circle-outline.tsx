/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M64 256c0 106 86 192 192 192s192-86 192-192S362 64 256 64 64 150 64 256z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M216 352L312 256 216 160'/>
    </svg>
)

const ChevronForwardCircleOutline = createIcon(svgElement)

ChevronForwardCircleOutline.displayName = 'ChevronForwardCircleOutline'

export { IconProps } from '../base/createIcon'

export default ChevronForwardCircleOutline
