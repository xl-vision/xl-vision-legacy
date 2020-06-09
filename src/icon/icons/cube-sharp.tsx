/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M48 170L48 366.92 240 480 240 284 48 170z'/><path d='M272 480l192-113.08V170L272 284zm176-122.36z'/><path d='M448 144L256 32 64 144 256 256 448 144z'/>
    </svg>
)

const CubeSharp = createIcon(svgElement)

CubeSharp.displayName = 'CubeSharp'

export { IconProps } from '../base/createIcon'

export default CubeSharp
