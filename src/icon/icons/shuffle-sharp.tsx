/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M400 304L448 352 400 400'/><path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M400 112L448 160 400 208'/><path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M64 352L192 352 252 260'/><path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M64 160L192 160 320 352 416 352'/><path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M416 160L320 160 288 208'/>
    </svg>
)

const ShuffleSharp = createIcon(svgElement)

ShuffleSharp.displayName = 'ShuffleSharp'

export { IconProps } from '../base/createIcon'

export default ShuffleSharp
