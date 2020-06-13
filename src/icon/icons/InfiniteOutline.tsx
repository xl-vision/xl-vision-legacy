/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M256 256s-48-96-126-96c-54.12 0-98 43-98 96s43.88 96 98 96c37.51 0 71-22.41 94-48M256 256s48 96 126 96c54.12 0 98-43 98-96s-43.88-96-98-96c-37.51 0-71 22.41-94 48'/>
    </svg>
)

const InfiniteOutline = createIcon(svgElement)

InfiniteOutline.displayName = 'InfiniteOutline'

export { IconProps } from '../base/createIcon'

export default InfiniteOutline
