/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <circle cx='256' cy='256' r='32' fill='none' strokeMiterlimit='10' strokeWidth='32'/><circle cx='416' cy='256' r='32' fill='none' strokeMiterlimit='10' strokeWidth='32'/><circle cx='96' cy='256' r='32' fill='none' strokeMiterlimit='10' strokeWidth='32'/>
    </svg>
)

const EllipsisHorizontalOutline = createIcon(svgElement)

EllipsisHorizontalOutline.displayName = 'EllipsisHorizontalOutline'

export { IconProps } from '../base/createIcon'

export default EllipsisHorizontalOutline
