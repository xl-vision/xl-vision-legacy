/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M238.23 342.43l89.09-74.13a16 16 0 000-24.6l-89.09-74.13A16 16 0 00212 181.86v148.28a16 16 0 0026.23 12.29z'/><path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/>
    </svg>
)

const CaretForwardCircleOutline = createIcon(svgElement)

CaretForwardCircleOutline.displayName = 'CaretForwardCircleOutline'

export { IconProps } from '../base/createIcon'

export default CaretForwardCircleOutline
