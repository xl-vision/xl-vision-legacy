/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M188.8 334.07h197.33L279.47 448H83.2zM512 199H106.61L0 313h405.39zM232.2 64h196.6L322.62 177.93H125.87z'/>
    </svg>
)

const LogoStencil = createIcon(svgElement)

LogoStencil.displayName = 'LogoStencil'

export { IconProps } from '../base/createIcon'

export default LogoStencil
