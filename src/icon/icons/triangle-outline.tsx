/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M48 448L256 64 464 448 48 448z'/>
    </svg>
)

const TriangleOutline = createIcon(svgElement)

TriangleOutline.displayName = 'TriangleOutline'

export { IconProps } from '../base/createIcon'

export default TriangleOutline
