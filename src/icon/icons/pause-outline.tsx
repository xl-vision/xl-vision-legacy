/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 96H192V416H176z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 96H336V416H320z'/>
    </svg>
)

const PauseOutline = createIcon(svgElement)

PauseOutline.displayName = 'PauseOutline'

export { IconProps } from '../base/createIcon'

export default PauseOutline
