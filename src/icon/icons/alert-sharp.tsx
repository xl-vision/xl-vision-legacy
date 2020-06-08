/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M240 80L248 320 264 320 272 80 240 80z'/><path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M240 400H272V432H240z'/>
    </svg>
)

const AlertSharp = createIcon(svgElement)

AlertSharp.displayName = 'AlertSharp'

export { IconProps } from '../base/createIcon'

export default AlertSharp
