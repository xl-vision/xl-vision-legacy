/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 176L217.6 336 160 272'/>
    </svg>
)

const CheckmarkCircleOutline = createIcon(svgElement)

CheckmarkCircleOutline.displayName = 'CheckmarkCircleOutline'

export { IconProps } from '../base/createIcon'

export default CheckmarkCircleOutline
