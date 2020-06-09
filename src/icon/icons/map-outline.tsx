/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M313.27 124.64L198.73 51.36a32 32 0 00-29.28.35L56.51 127.49A16 16 0 0048 141.63v295.8a16 16 0 0023.49 14.14l97.82-63.79a32 32 0 0129.5-.24l111.86 73a32 32 0 0029.27-.11l115.43-75.94a16 16 0 008.63-14.2V74.57a16 16 0 00-23.49-14.14l-98 63.86a32 32 0 01-29.24.35z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M328 128L328 464'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M184 48L184 384'/>
    </svg>
)

const MapOutline = createIcon(svgElement)

MapOutline.displayName = 'MapOutline'

export { IconProps } from '../base/createIcon'

export default MapOutline
