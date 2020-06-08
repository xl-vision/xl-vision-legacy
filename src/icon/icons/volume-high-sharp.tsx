/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64M368 368c19.48-33.92 32-64.06 32-112s-12-77.74-32-112M416 416c30-46 48-91.43 48-160s-18-113-48-160'/><path d='M125.65 176.1L32 176.1 32 335.9 125.65 335.9 256 440 256 72 125.65 176.1z'/>
    </svg>
)

const VolumeHighSharp = createIcon(svgElement)

VolumeHighSharp.displayName = 'VolumeHighSharp'

export { IconProps } from '../base/createIcon'

export default VolumeHighSharp
