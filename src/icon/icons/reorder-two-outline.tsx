/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 304L400 304'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 208L400 208'/>
    </svg>
)

const ReorderTwoOutline = createIcon(svgElement)

ReorderTwoOutline.displayName = 'ReorderTwoOutline'

export { IconProps } from '../base/createIcon'

export default ReorderTwoOutline
