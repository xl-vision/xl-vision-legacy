/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M421.83 293.82A144 144 0 00218.18 90.17M353.94 225.94a48 48 0 00-67.88-67.88'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M192 464L192 416'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M90.18 421.82L124.12 387.88'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M48 320L96 320'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M286.06 158.06L172.92 271.19a32 32 0 01-45.25 0L105 248.57a32 32 0 010-45.26L218.18 90.17M421.83 293.82L308.69 407a32 32 0 01-45.26 0l-22.62-22.63a32 32 0 010-45.26l113.13-113.17'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M139.6 169.98L207.48 237.87'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M275.36 305.75L343.25 373.63'/>
    </svg>
)

const MagnetOutline = createIcon(svgElement)

MagnetOutline.displayName = 'MagnetOutline'

export { IconProps } from '../base/createIcon'

export default MagnetOutline