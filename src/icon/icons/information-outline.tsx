/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='40' d='M196 220L260 220 260 392'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='40' d='M187 396L325 396'/><path d='M256 160a32 32 0 1132-32 32 32 0 01-32 32z'/>
    </svg>
)

const InformationOutline = createIcon(svgElement)

InformationOutline.displayName = 'InformationOutline'

export { IconProps } from '../base/createIcon'

export default InformationOutline
