/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M368 64L144 256 368 448 368 64z'/>
    </svg>
)

const CaretBackSharp = createIcon(svgElement)

CaretBackSharp.displayName = 'CaretBackSharp'

export { IconProps } from '../base/createIcon'

export default CaretBackSharp
