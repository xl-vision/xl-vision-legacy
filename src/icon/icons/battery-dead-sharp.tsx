/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M32 144H432V368H32z'/><path fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' d='M480 218.67L480 293.33'/>
    </svg>
)

const BatteryDeadSharp = createIcon(svgElement)

BatteryDeadSharp.displayName = 'BatteryDeadSharp'

export { IconProps } from '../base/createIcon'

export default BatteryDeadSharp
