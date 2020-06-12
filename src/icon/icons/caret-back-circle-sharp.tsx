/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48 48 141.13 48 256zm252 108.27L169.91 256 300 147.73z'/>
    </svg>
)

const CaretBackCircleSharp = createIcon(svgElement)

CaretBackCircleSharp.displayName = 'CaretBackCircleSharp'

export { IconProps } from '../base/createIcon'

export default CaretBackCircleSharp