/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='336' height='336' x='128' y='128' fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' rx='57' ry='57'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24'/>
    </svg>
)

const CopyOutline = createIcon(svgElement)

CopyOutline.displayName = 'CopyOutline'

export { IconProps } from '../base/createIcon'

export default CopyOutline
