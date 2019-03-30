import * as React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M275.9 330.7H171.3V480H17V32h109.5v104.5l305.1 85.6V480H275.9z'/>
    </svg>
)

const FabHouzz = createIcon(svgElement)

export { IconProps } from '../base/base-icon'

export default FabHouzz
