/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='352' height='480' x='80' y='16' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48' transform='rotate(-90 256 256)'/>
    </svg>
)

const TabletLandscapeOutline = createIcon(svgElement)

TabletLandscapeOutline.displayName = 'TabletLandscapeOutline'

export { IconProps } from '../base/createIcon'

export default TabletLandscapeOutline
