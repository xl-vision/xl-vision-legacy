/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M400 480a16 16 0 01-10.63-4L256 357.41 122.63 476A16 16 0 0196 464V96a64.07 64.07 0 0164-64h192a64.07 64.07 0 0164 64v368a16 16 0 01-16 16z'/>
    </svg>
)

const Bookmark = createIcon(svgElement)

Bookmark.displayName = 'Bookmark'

export { IconProps } from '../base/createIcon'

export default Bookmark