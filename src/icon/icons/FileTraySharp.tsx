/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M448 64H64L32 256v192h448V256zm-12 192H320a64 64 0 01-128 0H76l22-150h316z'/>
    </svg>
)

const FileTraySharp = createIcon(svgElement)

FileTraySharp.displayName = 'FileTraySharp'

export { IconProps } from '../base/createIcon'

export default FileTraySharp
