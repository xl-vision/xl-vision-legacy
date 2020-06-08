/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 232L256 152'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M256 88L256 72'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M132 132L120 120'/><circle cx='256' cy='272' r='32' fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32'/><path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M256 96a176 176 0 10176 176A176 176 0 00256 96z'/>
    </svg>
)

const StopwatchOutline = createIcon(svgElement)

StopwatchOutline.displayName = 'StopwatchOutline'

export { IconProps } from '../base/createIcon'

export default StopwatchOutline
