/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-48 128a48.14 48.14 0 0148-48 48.14 48.14 0 0148 48v64a48.14 48.14 0 01-48 48 48.14 48.14 0 01-48-48zm144 72.22c0 23.36-10.94 45.61-30.79 62.66A103.71 103.71 0 01272 334.26V352h16a16 16 0 010 32h-64a16 16 0 010-32h16v-17.74a103.71 103.71 0 01-49.21-23.38c-19.85-17.05-30.79-39.3-30.79-62.66V224.3a16 16 0 0132 0v23.92c0 25.66 28 55.48 64 55.48 29.6 0 64-24.23 64-55.48V224.3a16 16 0 1132 0z'/>
    </svg>
)

const MicCircle = createIcon(svgElement)

MicCircle.displayName = 'MicCircle'

export { IconProps } from '../base/createIcon'

export default MicCircle