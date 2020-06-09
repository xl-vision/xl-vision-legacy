/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M304 48L416 160 304 272'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M398.87 160L96 160'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M208 464L96 352 208 240'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M114 352L416 352'/>
    </svg>
)

const SwapHorizontalOutline = createIcon(svgElement)

SwapHorizontalOutline.displayName = 'SwapHorizontalOutline'

export { IconProps } from '../base/createIcon'

export default SwapHorizontalOutline
