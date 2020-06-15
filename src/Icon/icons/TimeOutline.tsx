/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 128L256 272 352 272'/>
    </svg>
)

const TimeOutline = createIcon(svgElement)

TimeOutline.displayName = 'TimeOutline'

export { IconProps } from '../base/createIcon'

export default TimeOutline
