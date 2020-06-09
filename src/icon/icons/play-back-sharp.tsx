/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M496 400L256 256 496 112 496 400z'/><path d='M256 400L16 256 256 112 256 400z'/>
    </svg>
)

const PlayBackSharp = createIcon(svgElement)

PlayBackSharp.displayName = 'PlayBackSharp'

export { IconProps } from '../base/createIcon'

export default PlayBackSharp
