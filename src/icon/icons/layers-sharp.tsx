/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M480 150L256 48 32 150 256 254 480 150z'/><path d='M255.71 392.95L110.9 326.75 32 362 256 464 480 362 401.31 326.7 255.71 392.95z'/><path d='M480 256l-75.53-33.53L256.1 290.6l-148.77-68.17L32 256l224 102 224-102z'/>
    </svg>
)

const LayersSharp = createIcon(svgElement)

LayersSharp.displayName = 'LayersSharp'

export { IconProps } from '../base/createIcon'

export default LayersSharp
