/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='48' d='M328 112L184 256 328 400'/>
    </svg>
)

const ChevronBackSharp = createIcon(svgElement)

ChevronBackSharp.displayName = 'ChevronBackSharp'

export { IconProps } from '../base/createIcon'

export default ChevronBackSharp
