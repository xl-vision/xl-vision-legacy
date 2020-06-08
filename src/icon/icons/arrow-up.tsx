/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 244L256 100 400 244'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M256 120L256 412'/>
    </svg>
)

const ArrowUp = createIcon(svgElement)

ArrowUp.displayName = 'ArrowUp'

export { IconProps } from '../base/createIcon'

export default ArrowUp
