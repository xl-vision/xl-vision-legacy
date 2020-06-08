/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 184L256 328 400 184'/>
    </svg>
)

const ChevronDownOutline = createIcon(svgElement)

ChevronDownOutline.displayName = 'ChevronDownOutline'

export { IconProps } from '../base/createIcon'

export default ChevronDownOutline
