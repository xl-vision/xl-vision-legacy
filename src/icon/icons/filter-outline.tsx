/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M32 144L480 144'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 256L400 256'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M208 368L304 368'/>
    </svg>
)

const FilterOutline = createIcon(svgElement)

FilterOutline.displayName = 'FilterOutline'

export { IconProps } from '../base/createIcon'

export default FilterOutline
