/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/>
    </svg>
)

const RadioButtonOff = createIcon(svgElement)

RadioButtonOff.displayName = 'RadioButtonOff'

export { IconProps } from '../base/createIcon'

export default RadioButtonOff
