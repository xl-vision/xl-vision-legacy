/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M413.48 284.46c58.87 47.24 91.61 89 80.31 108.55-17.85 30.85-138.78-5.48-270.1-81.15S.37 149.84 18.21 119c11.16-19.28 62.58-12.32 131.64 14.09'/><circle cx='256' cy='256' r='160' fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32'/>
    </svg>
)

const PlanetOutline = createIcon(svgElement)

PlanetOutline.displayName = 'PlanetOutline'

export { IconProps } from '../base/createIcon'

export default PlanetOutline
