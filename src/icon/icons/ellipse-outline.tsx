/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <circle cx='256' cy='256' r='192' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/>
    </svg>
)

const EllipseOutline = createIcon(svgElement)

EllipseOutline.displayName = 'EllipseOutline'

export { IconProps } from '../base/createIcon'

export default EllipseOutline
