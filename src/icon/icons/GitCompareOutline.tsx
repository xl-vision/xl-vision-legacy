/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M304 160L240 96 304 32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M207 352L271 416 207 480'/><circle cx='112' cy='96' r='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='400' cy='416' r='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 96h84a60 60 0 0160 60v212M255 416h-84a60 60 0 01-60-60V144'/>
    </svg>
)

const GitCompareOutline = createIcon(svgElement)

GitCompareOutline.displayName = 'GitCompareOutline'

export { IconProps } from '../base/createIcon'

export default GitCompareOutline
