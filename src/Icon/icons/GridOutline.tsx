/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='176' height='176' x='48' y='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='20' ry='20'/><rect width='176' height='176' x='288' y='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='20' ry='20'/><rect width='176' height='176' x='48' y='288' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='20' ry='20'/><rect width='176' height='176' x='288' y='288' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='20' ry='20'/>
    </svg>
)

const GridOutline = createIcon(svgElement)

GridOutline.displayName = 'GridOutline'

export { IconProps } from '../base/createIcon'

export default GridOutline
