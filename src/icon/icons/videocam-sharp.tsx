/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M336 208v-80a16 16 0 00-16-16H32a16 16 0 00-16 16v256a16 16 0 0016 16h288a16 16 0 0016-16v-80l160 96V112z'/>
    </svg>
)

const VideocamSharp = createIcon(svgElement)

VideocamSharp.displayName = 'VideocamSharp'

export { IconProps } from '../base/createIcon'

export default VideocamSharp
