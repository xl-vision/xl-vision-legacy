/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M16 464l480-208L16 48v160l320 48-320 48z'/>
    </svg>
)

const SendSharp = createIcon(svgElement)

SendSharp.displayName = 'SendSharp'

export { IconProps } from '../base/createIcon'

export default SendSharp
