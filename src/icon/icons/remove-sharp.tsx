/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M400 256L112 256'/>
    </svg>
)

const RemoveSharp = createIcon(svgElement)

RemoveSharp.displayName = 'RemoveSharp'

export { IconProps } from '../base/createIcon'

export default RemoveSharp
