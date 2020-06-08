/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M32 192L256 64 480 192 256 320 32 192z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 240L112 368 256 448 400 368 400 240'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M480 368L480 192'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 320L256 448'/>
    </svg>
)

const SchoolOutline = createIcon(svgElement)

SchoolOutline.displayName = 'SchoolOutline'

export { IconProps } from '../base/createIcon'

export default SchoolOutline
