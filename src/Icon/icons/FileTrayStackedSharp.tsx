/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M448 16H64L32 176v144h448V176zm-12 160H320a64 64 0 01-128 0H76L98 58h316zM320 352a64 64 0 01-128 0H32v144h448V352z'/>
    </svg>
)

const FileTrayStackedSharp = createIcon(svgElement)

FileTrayStackedSharp.displayName = 'FileTrayStackedSharp'

export { IconProps } from '../base/createIcon'

export default FileTrayStackedSharp
