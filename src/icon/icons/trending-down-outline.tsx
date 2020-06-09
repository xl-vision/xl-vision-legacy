/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 368L464 368 464 256'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M48 144l121.37 121.37a32 32 0 0045.26 0l50.74-50.74a32 32 0 0145.26 0L448 352'/>
    </svg>
)

const TrendingDownOutline = createIcon(svgElement)

TrendingDownOutline.displayName = 'TrendingDownOutline'

export { IconProps } from '../base/createIcon'

export default TrendingDownOutline
