/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M184 112L328 256 184 400'/>
    </svg>
)

const ChevronForward = createIcon(svgElement)

ChevronForward.displayName = 'ChevronForward'

export { IconProps } from '../base/createIcon'

export default ChevronForward
