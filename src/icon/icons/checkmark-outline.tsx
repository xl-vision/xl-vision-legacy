/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M416 128L192 384 96 288'/>
    </svg>
)

const CheckmarkOutline = createIcon(svgElement)

CheckmarkOutline.displayName = 'CheckmarkOutline'

export { IconProps } from '../base/createIcon'

export default CheckmarkOutline
