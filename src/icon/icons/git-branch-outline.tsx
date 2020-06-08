/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='160' cy='96' r='48' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='160' cy='416' r='48' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M160 368L160 144'/><circle cx='352' cy='160' r='48' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 208c0 128-192 48-192 160'/>
    </svg>
)

const GitBranchOutline = createIcon(svgElement)

GitBranchOutline.displayName = 'GitBranchOutline'

export { IconProps } from '../base/createIcon'

export default GitBranchOutline
