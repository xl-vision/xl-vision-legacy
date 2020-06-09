/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinejoin='round' strokeWidth='32' d='M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z'/>
    </svg>
)

const StarOutline = createIcon(svgElement)

StarOutline.displayName = 'StarOutline'

export { IconProps } from '../base/createIcon'

export default StarOutline
