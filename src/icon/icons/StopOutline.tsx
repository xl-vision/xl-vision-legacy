/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='320' height='320' x='96' y='96' fill='none' strokeLinejoin='round' strokeWidth='32' rx='24' ry='24'/>
    </svg>
)

const StopOutline = createIcon(svgElement)

StopOutline.displayName = 'StopOutline'

export { IconProps } from '../base/createIcon'

export default StopOutline
