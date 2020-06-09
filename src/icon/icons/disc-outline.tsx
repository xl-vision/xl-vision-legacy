/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <circle cx='256' cy='256' r='208' fill='none' strokeMiterlimit='10' strokeWidth='32'/><circle cx='256' cy='256' r='96' fill='none' strokeMiterlimit='10' strokeWidth='32'/><circle cx='256' cy='256' r='32'/>
    </svg>
)

const DiscOutline = createIcon(svgElement)

DiscOutline.displayName = 'DiscOutline'

export { IconProps } from '../base/createIcon'

export default DiscOutline
