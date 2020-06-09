/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm-40 326.63L193.37 352l96-96-96-96L216 137.37 334.63 256z'/>
    </svg>
)

const ChevronForwardCircleSharp = createIcon(svgElement)

ChevronForwardCircleSharp.displayName = 'ChevronForwardCircleSharp'

export { IconProps } from '../base/createIcon'

export default ChevronForwardCircleSharp
