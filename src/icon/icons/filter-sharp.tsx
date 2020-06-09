/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M16 120H496V168H16z'/><path d='M96 232H416V280H96z'/><path d='M192 344H320V392H192z'/>
    </svg>
)

const FilterSharp = createIcon(svgElement)

FilterSharp.displayName = 'FilterSharp'

export { IconProps } from '../base/createIcon'

export default FilterSharp
