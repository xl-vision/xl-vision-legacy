/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M80 152v256a40.12 40.12 0 0040 40h272a40.12 40.12 0 0040-40V152'/><rect width='416' height='80' x='48' y='64' fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' rx='28' ry='28'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 304L256 368 192 304'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 345.89L256 224'/>
    </svg>
)

const ArchiveOutline = createIcon(svgElement)

ArchiveOutline.displayName = 'ArchiveOutline'

export { IconProps } from '../base/createIcon'

export default ArchiveOutline
