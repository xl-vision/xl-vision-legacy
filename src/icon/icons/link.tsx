/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M200.66 352H144a96 96 0 010-192h55.41M312.59 160H368a96 96 0 010 192h-56.66'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M169.07 256L344.93 256'/>
    </svg>
)

const Link = createIcon(svgElement)

Link.displayName = 'Link'

export { IconProps } from '../base/createIcon'

export default Link
