/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M32 32v448h448V32zm249.67 250.83v84H235v-84l-77-140h55l46.32 97.54 44.33-97.54h52.73z'/>
    </svg>
)

const LogoHackernews = createIcon(svgElement)

LogoHackernews.displayName = 'LogoHackernews'

export { IconProps } from '../base/createIcon'

export default LogoHackernews
