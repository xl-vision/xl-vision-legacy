/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='352' height='192' x='80' y='112' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='32' ry='32'/><rect width='352' height='128' x='80' y='304' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='32' ry='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M400 112H112a32.09 32.09 0 01-32-32h0a32.09 32.09 0 0132-32h288a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32zM144 432v22a10 10 0 01-10 10h-28a10 10 0 01-10-10v-22zM416 432v22a10 10 0 01-10 10h-28a10 10 0 01-10-10v-22z'/><circle cx='368' cy='368' r='16' fill='none' strokeLinejoin='round' strokeWidth='32'/><circle cx='144' cy='368' r='16' fill='none' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 112L256 304'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M80 80L80 368'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M432 80L432 368'/>
    </svg>
)

const BusOutline = createIcon(svgElement)

BusOutline.displayName = 'BusOutline'

export { IconProps } from '../base/createIcon'

export default BusOutline