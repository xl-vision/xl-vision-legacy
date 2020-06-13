/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M328 112L184 256 328 400'/>
    </svg>
)

const ChevronBack = createIcon(svgElement)

ChevronBack.displayName = 'ChevronBack'

export { IconProps } from '../base/createIcon'

export default ChevronBack
