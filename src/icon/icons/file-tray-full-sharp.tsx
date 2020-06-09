/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M128 128H384V166H128z'/><path d='M112 192H400V230H112z'/><path d='M448 64H64L32 256v192h448V256zm-12 192H320a64 64 0 01-128 0H76l22-150h316z'/>
    </svg>
)

const FileTrayFullSharp = createIcon(svgElement)

FileTrayFullSharp.displayName = 'FileTrayFullSharp'

export { IconProps } from '../base/createIcon'

export default FileTrayFullSharp
