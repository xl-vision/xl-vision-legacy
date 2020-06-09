/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M448 368L256 144 64 368 448 368z'/>
    </svg>
)

const CaretUpSharp = createIcon(svgElement)

CaretUpSharp.displayName = 'CaretUpSharp'

export { IconProps } from '../base/createIcon'

export default CaretUpSharp
