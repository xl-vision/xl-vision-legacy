/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M307.72 302.27a8 8 0 01-3.72-6.75V80a48 48 0 00-48-48h0a48 48 0 00-48 48v215.52a8 8 0 01-3.71 6.74 97.51 97.51 0 00-44.19 86.07A96 96 0 00352 384a97.49 97.49 0 00-44.28-81.73z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M256 112L256 384'/><circle cx='256' cy='384' r='48'/>
    </svg>
)

const ThermometerOutline = createIcon(svgElement)

ThermometerOutline.displayName = 'ThermometerOutline'

export { IconProps } from '../base/createIcon'

export default ThermometerOutline
