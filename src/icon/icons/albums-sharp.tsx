/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M128 64H384V96H128z'/><path d='M96 112H416V144H96z'/><path d='M464 448H48V160h416z'/>
    </svg>
)

const AlbumsSharp = createIcon(svgElement)

AlbumsSharp.displayName = 'AlbumsSharp'

export { IconProps } from '../base/createIcon'

export default AlbumsSharp
