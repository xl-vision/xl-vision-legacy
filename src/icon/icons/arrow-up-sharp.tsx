/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='48' d='M112 244L256 100 400 244'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='48' d='M256 120L256 412'/>
    </svg>
)

const ArrowUpSharp = createIcon(svgElement)

ArrowUpSharp.displayName = 'ArrowUpSharp'

export { IconProps } from '../base/createIcon'

export default ArrowUpSharp
