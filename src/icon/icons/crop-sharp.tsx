/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M166 346L166 32 122 32 122 122 32 122 32 166 122 166 122 390 346 390 346 480 390 480 390 390 480 390 480 346 166 346z'/><path d='M346 320L390 320 390 122 192 122 192 166 346 166 346 320z'/>
    </svg>
)

const CropSharp = createIcon(svgElement)

CropSharp.displayName = 'CropSharp'

export { IconProps } from '../base/createIcon'

export default CropSharp
