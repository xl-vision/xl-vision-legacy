/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M368 112H144a144 144 0 000 288h224a144 144 0 000-288zm0 230a86 86 0 1186-86 85.88 85.88 0 01-86 86z'/>
    </svg>
)

const ToggleSharp = createIcon(svgElement)

ToggleSharp.displayName = 'ToggleSharp'

export { IconProps } from '../base/createIcon'

export default ToggleSharp
