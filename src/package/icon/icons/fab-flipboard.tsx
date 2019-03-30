import * as React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M0 32v448h448V32H0zm358.4 179.2h-89.6v89.6h-89.6v89.6H89.6V121.6h268.8v89.6z'/>
    </svg>
)

const FabFlipboard = createIcon(svgElement)

export { IconProps } from '../base/base-icon'

export default FabFlipboard
