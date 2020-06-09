/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M400 160L464 224 400 288'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M448 224H154c-58.76 0-106 49.33-106 108v20'/>
    </svg>
)

const ReturnUpForward = createIcon(svgElement)

ReturnUpForward.displayName = 'ReturnUpForward'

export { IconProps } from '../base/createIcon'

export default ReturnUpForward
