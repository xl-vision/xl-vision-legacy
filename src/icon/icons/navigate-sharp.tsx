/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M480 32L32 240 272 240 272 480 480 32z'/>
    </svg>
)

const NavigateSharp = createIcon(svgElement)

NavigateSharp.displayName = 'NavigateSharp'

export { IconProps } from '../base/createIcon'

export default NavigateSharp
