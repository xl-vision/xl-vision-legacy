/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='256' cy='184' r='120' fill='none' strokeLinejoin='round' strokeWidth='32'/><circle cx='344' cy='328' r='120' fill='none' strokeLinejoin='round' strokeWidth='32'/><circle cx='168' cy='328' r='120' fill='none' strokeLinejoin='round' strokeWidth='32'/>
    </svg>
)

const ColorFilterOutline = createIcon(svgElement)

ColorFilterOutline.displayName = 'ColorFilterOutline'

export { IconProps } from '../base/createIcon'

export default ColorFilterOutline
