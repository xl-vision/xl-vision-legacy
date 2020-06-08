/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='400' height='224' x='31' y='144' fill='none' stroke='currentColor' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' rx='45.7' ry='45.7'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M479 218.67L479 293.33'/>
    </svg>
)

const BatteryDead = createIcon(svgElement)

BatteryDead.displayName = 'BatteryDead'

export { IconProps } from '../base/createIcon'

export default BatteryDead
