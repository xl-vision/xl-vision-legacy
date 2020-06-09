/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M480 224H380a128 128 0 00-247.9 0H32v64h100.05A128 128 0 00380 288h100zm-224 96a64 64 0 1164-64 64.07 64.07 0 01-64 64z'/>
    </svg>
)

const GitCommitSharp = createIcon(svgElement)

GitCommitSharp.displayName = 'GitCommitSharp'

export { IconProps } from '../base/createIcon'

export default GitCommitSharp
