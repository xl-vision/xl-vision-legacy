/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <circle cx='256' cy='256' r='192' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M432.94 255.05a192 192 0 01-176.31-180.7M255 433.61A192 192 0 0074.29 256.69'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M120.24 120.24L391.76 391.76'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M120.24 391.76L391.76 120.24'/>
    </svg>
)

const BasketballOutline = createIcon(svgElement)

BasketballOutline.displayName = 'BasketballOutline'

export { IconProps } from '../base/createIcon'

export default BasketballOutline
