/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M256 48L256 96'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M256 416L256 464'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M403.08 108.92L369.14 142.86'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M142.86 369.14L108.92 403.08'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M464 256L416 256'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M96 256L48 256'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M403.08 403.08L369.14 369.14'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M142.86 142.86L108.92 108.92'/><circle cx='256' cy='256' r='80' fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32'/>
    </svg>
)

const SunnyOutline = createIcon(svgElement)

SunnyOutline.displayName = 'SunnyOutline'

export { IconProps } from '../base/createIcon'

export default SunnyOutline
