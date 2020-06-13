/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M32 415.5L152 95.5 272 415.5'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M230 303.5L74 303.5'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M326 239.5c12.19-28.69 41-48 74-48h0c46 0 80 32 80 80v144'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 358.5c0 36 26.86 58 60 58 54 0 100-27 100-106v-15c-20 0-58 1-92 5-32.77 3.86-68 19-68 58z'/>
    </svg>
)

const TextOutline = createIcon(svgElement)

TextOutline.displayName = 'TextOutline'

export { IconProps } from '../base/createIcon'

export default TextOutline
