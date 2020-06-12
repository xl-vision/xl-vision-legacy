/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M403.29 32H280.36a14.46 14.46 0 00-10.2 4.2L24.4 281.9a28.85 28.85 0 000 40.7l117 117a28.86 28.86 0 0040.71 0L427.8 194a14.46 14.46 0 004.2-10.2v-123A28.66 28.66 0 00403.29 32z'/><path d='M352 144a32 32 0 1132-32 32 32 0 01-32 32z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M230 480l262-262a13.81 13.81 0 004-10V80'/>
    </svg>
)

const PricetagsOutline = createIcon(svgElement)

PricetagsOutline.displayName = 'PricetagsOutline'

export { IconProps } from '../base/createIcon'

export default PricetagsOutline