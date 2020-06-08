/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M388 288a76 76 0 1076 76 76.24 76.24 0 00-76-76zM124 288a76 76 0 1076 76 76.24 76.24 0 00-76-76z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 360L256 274 192 232 272 144 312 216 368 216'/><path d='M320 136a31.89 31.89 0 0032-32.1A31.55 31.55 0 00320.2 72a32 32 0 10-.2 64z'/>
    </svg>
)

const BicycleOutline = createIcon(svgElement)

BicycleOutline.displayName = 'BicycleOutline'

export { IconProps } from '../base/createIcon'

export default BicycleOutline
