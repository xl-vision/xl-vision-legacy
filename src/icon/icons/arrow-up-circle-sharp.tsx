/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm80.09 224L272 208.42V358h-32V208.42L175.91 272l-22.54-22.7L256 147.46 358.63 249.3z'/>
    </svg>
)

const ArrowUpCircleSharp = createIcon(svgElement)

ArrowUpCircleSharp.displayName = 'ArrowUpCircleSharp'

export { IconProps } from '../base/createIcon'

export default ArrowUpCircleSharp
