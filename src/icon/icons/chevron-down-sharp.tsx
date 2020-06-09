/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='48' d='M112 184L256 328 400 184'/>
    </svg>
)

const ChevronDownSharp = createIcon(svgElement)

ChevronDownSharp.displayName = 'ChevronDownSharp'

export { IconProps } from '../base/createIcon'

export default ChevronDownSharp
