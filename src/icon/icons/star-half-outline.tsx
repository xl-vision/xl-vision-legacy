/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' d='M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z'/><path d='M256 48L256 364 118 464 172 304 32 208 204 208 256 48z'/>
    </svg>
)

const StarHalfOutline = createIcon(svgElement)

StarHalfOutline.displayName = 'StarHalfOutline'

export { IconProps } from '../base/createIcon'

export default StarHalfOutline
