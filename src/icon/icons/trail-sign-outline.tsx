/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 400L256 464'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 208L256 272'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 48L256 80'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M416 208H102.63a16 16 0 01-11.32-4.69L32 144l59.31-59.31A16 16 0 01102.63 80H416a16 16 0 0116 16v96a16 16 0 01-16 16zM96 400h313.37a16 16 0 0011.32-4.69L480 336l-59.31-59.31a16 16 0 00-11.32-4.69H96a16 16 0 00-16 16v96a16 16 0 0016 16z'/>
    </svg>
)

const TrailSignOutline = createIcon(svgElement)

TrailSignOutline.displayName = 'TrailSignOutline'

export { IconProps } from '../base/createIcon'

export default TrailSignOutline
