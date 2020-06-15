/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='256' cy='256' r='96' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M160 256L48 256'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M464 256L352 256'/>
    </svg>
)

const GitCommitOutline = createIcon(svgElement)

GitCommitOutline.displayName = 'GitCommitOutline'

export { IconProps } from '../base/createIcon'

export default GitCommitOutline
