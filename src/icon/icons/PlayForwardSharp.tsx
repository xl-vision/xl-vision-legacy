/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M16 400L256 256 16 112 16 400z'/><path d='M256 400L496 256 256 112 256 400z'/>
    </svg>
)

const PlayForwardSharp = createIcon(svgElement)

PlayForwardSharp.displayName = 'PlayForwardSharp'

export { IconProps } from '../base/createIcon'

export default PlayForwardSharp
