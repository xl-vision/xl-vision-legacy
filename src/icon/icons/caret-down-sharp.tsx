/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M64 144L256 368 448 144 64 144z'/>
    </svg>
)

const CaretDownSharp = createIcon(svgElement)

CaretDownSharp.displayName = 'CaretDownSharp'

export { IconProps } from '../base/createIcon'

export default CaretDownSharp
