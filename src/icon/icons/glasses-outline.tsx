/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M224 232a32 32 0 0164 0'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M448 200L464 200'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M64 200L48 200'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M64 200c0 96 16 128 80 128s80-32 80-128c0 0-16-16-80-16s-80 16-80 16zM448 200c0 96-16 128-80 128s-80-32-80-128c0 0 16-16 80-16s80 16 80 16z'/>
    </svg>
)

const GlassesOutline = createIcon(svgElement)

GlassesOutline.displayName = 'GlassesOutline'

export { IconProps } from '../base/createIcon'

export default GlassesOutline
