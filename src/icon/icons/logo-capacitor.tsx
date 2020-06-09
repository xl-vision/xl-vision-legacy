/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M480 101.09L372.37 208.72l106.86 107.06-69.3 69.3-283.22-283.23L196 32.54l107.07 106.88L410.67 32zM32.55 196l69.3-69.31 283.22 283.24-69.3 69.3-107-106.87L101.08 480 32 410.67l107.42-107.61z'/>
    </svg>
)

const LogoCapacitor = createIcon(svgElement)

LogoCapacitor.displayName = 'LogoCapacitor'

export { IconProps } from '../base/createIcon'

export default LogoCapacitor
