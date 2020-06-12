/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M320 146s24.36-12-64-12a160 160 0 10160 160'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 58L336 138 256 218'/>
    </svg>
)

const Refresh = createIcon(svgElement)

Refresh.displayName = 'Refresh'

export { IconProps } from '../base/createIcon'

export default Refresh