/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M416 32H96v112l108 112L96 368v112h320V368L308 256l108-112zM272 224v112l91 96H148l92-96V224l-80-80h192z'/>
    </svg>
)

const HourglassSharp = createIcon(svgElement)

HourglassSharp.displayName = 'HourglassSharp'

export { IconProps } from '../base/createIcon'

export default HourglassSharp
