/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 120L368 168 320 216'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 168H144a80.24 80.24 0 00-80 80v16'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M192 392L144 344 192 296'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M160 344h208a80.24 80.24 0 0080-80v-16'/>
    </svg>
)

const RepeatOutline = createIcon(svgElement)

RepeatOutline.displayName = 'RepeatOutline'

export { IconProps } from '../base/createIcon'

export default RepeatOutline
