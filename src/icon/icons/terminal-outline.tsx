/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='448' height='416' x='32' y='48' fill='none' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M96 112L176 176 96 240'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M192 240L256 240'/>
    </svg>
)

const TerminalOutline = createIcon(svgElement)

TerminalOutline.displayName = 'TerminalOutline'

export { IconProps } from '../base/createIcon'

export default TerminalOutline