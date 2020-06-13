/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M464.37 49.2a22.07 22.07 0 00-31.88-.76l-18.31 18.25 31.18 31.1 18-17.91a22.16 22.16 0 001.01-30.68z'/><path d='M252.76 336L239.49 336 208 336 176 336 176 304 176 272.51 176 259.24 185.4 249.86 323.54 112 48 112 48 464 400 464 400 188.46 262.14 326.6 252.76 336z'/><path d='M400 143.16L432.79 110.3 401.7 79.21 368.85 112 400 112 400 143.16z'/><path d='M208 304L239.49 304 400 143.16 400 112 368.85 112 208 272.51 208 304z'/>
    </svg>
)

const CreateSharp = createIcon(svgElement)

CreateSharp.displayName = 'CreateSharp'

export { IconProps } from '../base/createIcon'

export default CreateSharp
