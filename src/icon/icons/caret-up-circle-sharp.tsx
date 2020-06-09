/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zM147.73 300L256 169.91 364.27 300z'/>
    </svg>
)

const CaretUpCircleSharp = createIcon(svgElement)

CaretUpCircleSharp.displayName = 'CaretUpCircleSharp'

export { IconProps } from '../base/createIcon'

export default CaretUpCircleSharp
