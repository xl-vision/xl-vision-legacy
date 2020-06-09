/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z'/>
    </svg>
)

const BookmarkOutline = createIcon(svgElement)

BookmarkOutline.displayName = 'BookmarkOutline'

export { IconProps } from '../base/createIcon'

export default BookmarkOutline
