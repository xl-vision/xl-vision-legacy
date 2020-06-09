/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M432 320L432 432 320 432'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M421.8 421.77L304 304'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M80 192L80 80 192 80'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M90.2 90.23L208 208'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M320 80L432 80 432 192'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M421.77 90.2L304 208'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M192 432L80 432 80 320'/><path fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M90.23 421.8L208 304'/>
    </svg>
)

const ExpandSharp = createIcon(svgElement)

ExpandSharp.displayName = 'ExpandSharp'

export { IconProps } from '../base/createIcon'

export default ExpandSharp
