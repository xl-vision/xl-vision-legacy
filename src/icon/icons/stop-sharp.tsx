/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M80 80H432V432H80z'/>
    </svg>
)

const StopSharp = createIcon(svgElement)

StopSharp.displayName = 'StopSharp'

export { IconProps } from '../base/createIcon'

export default StopSharp