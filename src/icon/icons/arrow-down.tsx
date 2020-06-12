/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 268L256 412 400 268'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M256 392L256 100'/>
    </svg>
)

const ArrowDown = createIcon(svgElement)

ArrowDown.displayName = 'ArrowDown'

export { IconProps } from '../base/createIcon'

export default ArrowDown