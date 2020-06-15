/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 336h40a40 40 0 0040-40V88a40 40 0 00-40-40H136a40 40 0 00-40 40v208a40 40 0 0040 40h40'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 240L256 160 336 240'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 464L256 176'/>
    </svg>
)

const PushOutline = createIcon(svgElement)

PushOutline.displayName = 'PushOutline'

export { IconProps } from '../base/createIcon'

export default PushOutline
