/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M32 64v384a16 16 0 0016 16h416a16 16 0 0016-16V64a16 16 0 00-16-16H48a16 16 0 00-16 16zm408 364H72a4 4 0 01-4-4V152a4 4 0 014-4h368a4 4 0 014 4v272a4 4 0 01-4 4z'/>
    </svg>
)

const BrowsersSharp = createIcon(svgElement)

BrowsersSharp.displayName = 'BrowsersSharp'

export { IconProps } from '../base/createIcon'

export default BrowsersSharp
