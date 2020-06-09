/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 368L144 144'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 144L144 368'/>
    </svg>
)

const CloseOutline = createIcon(svgElement)

CloseOutline.displayName = 'CloseOutline'

export { IconProps } from '../base/createIcon'

export default CloseOutline
