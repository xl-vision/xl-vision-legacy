/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M103 464L48 464 48 409 358.14 98.09 413.91 153.87 103 464z'/><path d='M425.72 142L370 86.28l31.66-30.66C406.55 50.7 414.05 48 421 48a25.91 25.91 0 0118.42 7.62l17 17A25.87 25.87 0 01464 91c0 7-2.71 14.45-7.62 19.36zm-7.52-70.83z'/>
    </svg>
)

const PencilSharp = createIcon(svgElement)

PencilSharp.displayName = 'PencilSharp'

export { IconProps } from '../base/createIcon'

export default PencilSharp
