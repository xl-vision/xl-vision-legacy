/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M160 368L32 256 160 144'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 368L480 256 352 144'/>
    </svg>
)

const CodeOutline = createIcon(svgElement)

CodeOutline.displayName = 'CodeOutline'

export { IconProps } from '../base/createIcon'

export default CodeOutline
