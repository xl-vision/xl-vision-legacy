/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M96 448L416 256 96 64 96 448z'/>
    </svg>
)

const PlaySharp = createIcon(svgElement)

PlaySharp.displayName = 'PlaySharp'

export { IconProps } from '../base/createIcon'

export default PlaySharp
