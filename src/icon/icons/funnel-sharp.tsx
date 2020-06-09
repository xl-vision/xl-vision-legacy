/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M0 48L192 288 192 416 320 464 320 288 512 48 0 48z'/>
    </svg>
)

const FunnelSharp = createIcon(svgElement)

FunnelSharp.displayName = 'FunnelSharp'

export { IconProps } from '../base/createIcon'

export default FunnelSharp
