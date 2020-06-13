/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M327.71 130.93L184 39 32 144v336l152.29-98.93L328 473l152-105V32zM312 421l-112-72V91l112 72z'/>
    </svg>
)

const MapSharp = createIcon(svgElement)

MapSharp.displayName = 'MapSharp'

export { IconProps } from '../base/createIcon'

export default MapSharp
