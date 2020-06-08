/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='44' d='M416 128L192 384 96 288'/>
    </svg>
)

const CheckmarkSharp = createIcon(svgElement)

CheckmarkSharp.displayName = 'CheckmarkSharp'

export { IconProps } from '../base/createIcon'

export default CheckmarkSharp
