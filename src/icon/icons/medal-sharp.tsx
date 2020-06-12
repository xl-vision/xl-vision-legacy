/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M80 32L16 160 305.11 160 385.33 32 80 32z'/><path d='M496 144L424 32 298 231.08a128 128 0 00-84 0L189.53 192H43.82l86.66 134.89a128 128 0 10251 0zM256 422a70 70 0 1170-70 70.08 70.08 0 01-70 70z'/><circle cx='256' cy='352' r='32'/>
    </svg>
)

const MedalSharp = createIcon(svgElement)

MedalSharp.displayName = 'MedalSharp'

export { IconProps } from '../base/createIcon'

export default MedalSharp