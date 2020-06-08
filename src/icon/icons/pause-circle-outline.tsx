/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M208 192L208 320'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M304 192L304 320'/>
    </svg>
)

const PauseCircleOutline = createIcon(svgElement)

PauseCircleOutline.displayName = 'PauseCircleOutline'

export { IconProps } from '../base/createIcon'

export default PauseCircleOutline
