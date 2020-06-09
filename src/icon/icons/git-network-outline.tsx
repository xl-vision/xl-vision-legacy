/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='128' cy='96' r='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='256' cy='416' r='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 256L256 368'/><circle cx='384' cy='96' r='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M128 144c0 74.67 68.92 112 128 112M384 144c0 74.67-68.92 112-128 112'/>
    </svg>
)

const GitNetworkOutline = createIcon(svgElement)

GitNetworkOutline.displayName = 'GitNetworkOutline'

export { IconProps } from '../base/createIcon'

export default GitNetworkOutline
