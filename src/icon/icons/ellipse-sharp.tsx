/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208z'/>
    </svg>
)

const EllipseSharp = createIcon(svgElement)

EllipseSharp.displayName = 'EllipseSharp'

export { IconProps } from '../base/createIcon'

export default EllipseSharp
