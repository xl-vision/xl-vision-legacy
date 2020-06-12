/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M256.05 80.65Q263.94 80 272 80c106 0 192 86 192 192s-86 192-192 192A192.09 192.09 0 0189.12 330.65'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 48C141.12 48 48 141.12 48 256a207.29 207.29 0 0018.09 85L256 256z'/>
    </svg>
)

const PieChartOutline = createIcon(svgElement)

PieChartOutline.displayName = 'PieChartOutline'

export { IconProps } from '../base/createIcon'

export default PieChartOutline