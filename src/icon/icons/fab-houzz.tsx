import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fab-houzz`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M275.9 330.7H171.3V480H17V32h109.5v104.5l305.1 85.6V480H275.9z'/>
    </svg>
)

const FabHouzz = createIcon(svgElement)

FabHouzz.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabHouzz
