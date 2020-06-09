/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M160 32H352V480H160z'/><path d='M384 192H496V480H384z'/><path d='M16 128H128V480H16z'/>
    </svg>
)

const PodiumSharp = createIcon(svgElement)

PodiumSharp.displayName = 'PodiumSharp'

export { IconProps } from '../base/createIcon'

export default PodiumSharp
