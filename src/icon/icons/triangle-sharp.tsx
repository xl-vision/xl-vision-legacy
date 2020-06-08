/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 32L20 464 492 464 256 32z'/>
    </svg>
)

const TriangleSharp = createIcon(svgElement)

TriangleSharp.displayName = 'TriangleSharp'

export { IconProps } from '../base/createIcon'

export default TriangleSharp
