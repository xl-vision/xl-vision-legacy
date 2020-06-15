/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='48' height='160' x='64' y='320' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='8' ry='8'/><rect width='48' height='256' x='288' y='224' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='8' ry='8'/><rect width='48' height='368' x='400' y='112' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='8' ry='8'/><rect width='48' height='448' x='176' y='32' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='8' ry='8'/>
    </svg>
)

const StatsChartOutline = createIcon(svgElement)

StatsChartOutline.displayName = 'StatsChartOutline'

export { IconProps } from '../base/createIcon'

export default StatsChartOutline
