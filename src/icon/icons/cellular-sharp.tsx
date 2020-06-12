/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M496 432h-96V80h96zM368 432h-96V160h96zM240 432h-96V224h96zM112 432H16V288h96z'/>
    </svg>
)

const CellularSharp = createIcon(svgElement)

CellularSharp.displayName = 'CellularSharp'

export { IconProps } from '../base/createIcon'

export default CellularSharp