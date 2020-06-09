/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M48 48v416h416V48zm170 312.38l-80.6-89.57 23.79-21.41 56 62.22L350 153.46 374.54 174z'/>
    </svg>
)

const CheckboxSharp = createIcon(svgElement)

CheckboxSharp.displayName = 'CheckboxSharp'

export { IconProps } from '../base/createIcon'

export default CheckboxSharp
