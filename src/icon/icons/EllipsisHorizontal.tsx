/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/>
    </svg>
)

const EllipsisHorizontal = createIcon(svgElement)

EllipsisHorizontal.displayName = 'EllipsisHorizontal'

export { IconProps } from '../base/createIcon'

export default EllipsisHorizontal
