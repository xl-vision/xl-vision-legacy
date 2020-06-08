/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 120L368 168 320 216'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 168H144a80.24 80.24 0 00-80 80v16'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M192 392L144 344 192 296'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M160 344h208a80.24 80.24 0 0080-80v-16'/>
    </svg>
)

const Repeat = createIcon(svgElement)

Repeat.displayName = 'Repeat'

export { IconProps } from '../base/createIcon'

export default Repeat
