/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='256' cy='256' r='32' fill='none' strokeMiterlimit='10' strokeWidth='32'/><circle cx='256' cy='416' r='32' fill='none' strokeMiterlimit='10' strokeWidth='32'/><circle cx='256' cy='96' r='32' fill='none' strokeMiterlimit='10' strokeWidth='32'/>
    </svg>
)

const EllipsisVerticalOutline = createIcon(svgElement)

EllipsisVerticalOutline.displayName = 'EllipsisVerticalOutline'

export { IconProps } from '../base/createIcon'

export default EllipsisVerticalOutline
