/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <rect width='288' height='288' x='112' y='112' fill='none' strokeLinejoin='round' strokeWidth='32' rx='64' ry='64'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M176 112V40a8 8 0 018-8h144a8 8 0 018 8v72M336 400v72a8 8 0 01-8 8H184a8 8 0 01-8-8v-72'/>
    </svg>
)

const WatchOutline = createIcon(svgElement)

WatchOutline.displayName = 'WatchOutline'

export { IconProps } from '../base/createIcon'

export default WatchOutline
