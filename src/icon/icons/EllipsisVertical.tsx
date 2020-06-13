/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='256' cy='256' r='48'/><circle cx='256' cy='416' r='48'/><circle cx='256' cy='96' r='48'/>
    </svg>
)

const EllipsisVertical = createIcon(svgElement)

EllipsisVertical.displayName = 'EllipsisVertical'

export { IconProps } from '../base/createIcon'

export default EllipsisVertical
