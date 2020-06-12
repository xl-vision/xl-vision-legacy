/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M112 0L112 48 416 48 416 416 464 448 464 0 112 0z'/><path d='M48 80L48 512 216 388 384 512 384 80 48 80z'/>
    </svg>
)

const BookmarksSharp = createIcon(svgElement)

BookmarksSharp.displayName = 'BookmarksSharp'

export { IconProps } from '../base/createIcon'

export default BookmarksSharp