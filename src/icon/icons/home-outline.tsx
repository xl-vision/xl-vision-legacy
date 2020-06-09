/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M400 179L400 64 352 64 352 133'/>
    </svg>
)

const HomeOutline = createIcon(svgElement)

HomeOutline.displayName = 'HomeOutline'

export { IconProps } from '../base/createIcon'

export default HomeOutline
