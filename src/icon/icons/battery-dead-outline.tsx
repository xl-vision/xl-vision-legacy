/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <rect width='400' height='224' x='31' y='144' fill='none' strokeLinecap='square' strokeMiterlimit='10' strokeWidth='32' rx='45.7' ry='45.7'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M479 218.67L479 293.33'/>
    </svg>
)

const BatteryDeadOutline = createIcon(svgElement)

BatteryDeadOutline.displayName = 'BatteryDeadOutline'

export { IconProps } from '../base/createIcon'

export default BatteryDeadOutline
