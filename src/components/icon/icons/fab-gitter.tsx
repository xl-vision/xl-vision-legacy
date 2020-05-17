/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 384 512'>
        <path d='M66.4 322.5H16V0h50.4v322.5zM166.9 76.1h-50.4V512h50.4V76.1zm100.6 0h-50.4V512h50.4V76.1zM368 76h-50.4v247H368V76z'/>
    </svg>
)

const FabGitter = createIcon(svgElement)

FabGitter.displayName = 'FabGitter'

export { IconProps } from '../base/createIcon'

export default FabGitter
