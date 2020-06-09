/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <circle cx='256' cy='56' r='56'/><path d='M336 128H176a32 32 0 00-32 32v160h48V192h8v320h52V328h8v184h52V192h8v128h48V160a32 32 0 00-32-32z'/>
    </svg>
)

const ManSharp = createIcon(svgElement)

ManSharp.displayName = 'ManSharp'

export { IconProps } from '../base/createIcon'

export default ManSharp
