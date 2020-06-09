/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 320c0-93 124-165 96-272 66 0 192 96 192 272a144 144 0 01-288 0z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 368c0 57.71-32 80-64 80s-64-22.29-64-80 40-86 32-128c42 0 96 70.29 96 128z'/>
    </svg>
)

const FlameOutline = createIcon(svgElement)

FlameOutline.displayName = 'FlameOutline'

export { IconProps } from '../base/createIcon'

export default FlameOutline
