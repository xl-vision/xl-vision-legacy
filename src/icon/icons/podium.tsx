/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M320 32H192a32 32 0 00-32 32v412a4 4 0 004 4h184a4 4 0 004-4V64a32 32 0 00-32-32zM464 192h-72a8 8 0 00-8 8v272a8 8 0 008 8h80a24 24 0 0024-24V224a32 32 0 00-32-32zM48 128a32 32 0 00-32 32v296a24 24 0 0024 24h80a8 8 0 008-8V136a8 8 0 00-8-8z'/>
    </svg>
)

const Podium = createIcon(svgElement)

Podium.displayName = 'Podium'

export { IconProps } from '../base/createIcon'

export default Podium