/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M344 280L432 192'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M232 216L296 280'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M80 320L184 216'/><circle cx='456' cy='168' r='24' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='320' cy='304' r='24' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='208' cy='192' r='24' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='56' cy='344' r='24' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/>
    </svg>
)

const AnalyticsOutline = createIcon(svgElement)

AnalyticsOutline.displayName = 'AnalyticsOutline'

export { IconProps } from '../base/createIcon'

export default AnalyticsOutline