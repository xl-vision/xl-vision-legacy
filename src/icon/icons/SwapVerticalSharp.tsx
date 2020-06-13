/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M464 208L352 96 240 208'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M352 113.13L352 416'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M48 304L160 416 272 304'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M160 398L160 96'/>
    </svg>
)

const SwapVerticalSharp = createIcon(svgElement)

SwapVerticalSharp.displayName = 'SwapVerticalSharp'

export { IconProps } from '../base/createIcon'

export default SwapVerticalSharp
