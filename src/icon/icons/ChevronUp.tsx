/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 328L256 184 400 328'/>
    </svg>
)

const ChevronUp = createIcon(svgElement)

ChevronUp.displayName = 'ChevronUp'

export { IconProps } from '../base/createIcon'

export default ChevronUp
