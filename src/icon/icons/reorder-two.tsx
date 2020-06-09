/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='44' d='M118 304L394 304'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='44' d='M118 208L394 208'/>
    </svg>
)

const ReorderTwo = createIcon(svgElement)

ReorderTwo.displayName = 'ReorderTwo'

export { IconProps } from '../base/createIcon'

export default ReorderTwo
