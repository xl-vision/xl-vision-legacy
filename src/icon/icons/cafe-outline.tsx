/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 80h64a16 16 0 0116 16v34a46 46 0 01-46 46h-34M96 80h272v192a80 80 0 01-80 80H176a80 80 0 01-80-80V80h0z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M64 416L400 416'/>
    </svg>
)

const CafeOutline = createIcon(svgElement)

CafeOutline.displayName = 'CafeOutline'

export { IconProps } from '../base/createIcon'

export default CafeOutline
