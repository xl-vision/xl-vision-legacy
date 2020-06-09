/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <rect width='320' height='416' x='96' y='48' fill='none' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/><path fill='none' strokeLinejoin='round' strokeWidth='60' d='M320 48L320 464'/>
    </svg>
)

const JournalOutline = createIcon(svgElement)

JournalOutline.displayName = 'JournalOutline'

export { IconProps } from '../base/createIcon'

export default JournalOutline
