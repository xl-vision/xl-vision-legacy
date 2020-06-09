/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M144 352L368 160 256 48 256 464 368 352 144 160'/>
    </svg>
)

const BluetoothOutline = createIcon(svgElement)

BluetoothOutline.displayName = 'BluetoothOutline'

export { IconProps } from '../base/createIcon'

export default BluetoothOutline
