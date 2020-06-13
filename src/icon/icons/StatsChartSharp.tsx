/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M128 496H48V304h80zM352 496h-80V208h80zM464 496h-80V96h80zM240 496h-80V16h80z'/>
    </svg>
)

const StatsChartSharp = createIcon(svgElement)

StatsChartSharp.displayName = 'StatsChartSharp'

export { IconProps } from '../base/createIcon'

export default StatsChartSharp
