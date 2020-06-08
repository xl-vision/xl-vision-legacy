/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M448 224h-68a128 128 0 00-247.9 0H64a32 32 0 000 64h68.05A128 128 0 00380 288h68a32 32 0 000-64zm-192 96a64 64 0 1164-64 64.07 64.07 0 01-64 64z'/>
    </svg>
)

const GitCommit = createIcon(svgElement)

GitCommit.displayName = 'GitCommit'

export { IconProps } from '../base/createIcon'

export default GitCommit
