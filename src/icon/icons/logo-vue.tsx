/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M256 144.03L200.51 47.92 121.08 47.92 256 281.61 390.92 47.92 311.49 47.92 256 144.03z'/><path d='M409.4 47.92L256 313.61 102.6 47.92 15.74 47.92 256 464.08 496.26 47.92 409.4 47.92z'/>
    </svg>
)

const LogoVue = createIcon(svgElement)

LogoVue.displayName = 'LogoVue'

export { IconProps } from '../base/createIcon'

export default LogoVue
