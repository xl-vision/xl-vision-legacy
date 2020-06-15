/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M48 48H464V464H48z'/>
    </svg>
)

const SquareSharp = createIcon(svgElement)

SquareSharp.displayName = 'SquareSharp'

export { IconProps } from '../base/createIcon'

export default SquareSharp
