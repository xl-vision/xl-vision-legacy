/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M432 144l-28.67 275.74A32 32 0 01371.55 448H140.46a32 32 0 01-31.78-28.26L80 144'/><rect width='448' height='80' x='32' y='64' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='16' ry='16'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M312 240L200 352'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M312 352L200 240'/>
    </svg>
)

const TrashBinOutline = createIcon(svgElement)

TrashBinOutline.displayName = 'TrashBinOutline'

export { IconProps } from '../base/createIcon'

export default TrashBinOutline
