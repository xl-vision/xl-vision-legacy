/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 400L256 32 432 112 256 192'/><path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M256 336c-87 0-175.3 43.2-191.64 124.74C62.39 470.57 68.57 480 80 480h352c11.44 0 17.62-9.43 15.65-19.26C431.3 379.2 343 336 256 336z'/>
    </svg>
)

const GolfOutline = createIcon(svgElement)

GolfOutline.displayName = 'GolfOutline'

export { IconProps } from '../base/createIcon'

export default GolfOutline
