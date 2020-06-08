/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 464c-114.69 0-208-93.47-208-208.35 0-62.45 27.25-121 74.76-160.55a22 22 0 1128.17 33.8C113.48 160.1 92 206.3 92 255.65 92 346.27 165.57 420 256 420s164-73.73 164-164.35A164 164 0 00360.17 129a22 22 0 1128-33.92A207.88 207.88 0 01464 255.65C464 370.53 370.69 464 256 464z'/><path d='M256 272a22 22 0 01-22-22V70a22 22 0 0144 0v180a22 22 0 01-22 22z'/>
    </svg>
)

const Power = createIcon(svgElement)

Power.displayName = 'Power'

export { IconProps } from '../base/createIcon'

export default Power
