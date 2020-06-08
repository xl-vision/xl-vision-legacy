/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M256 48C192 48 96 171.69 96 286.55S160 464 256 464s160-62.59 160-177.45S320 48 256 48z'/>
    </svg>
)

const EggOutline = createIcon(svgElement)

EggOutline.displayName = 'EggOutline'

export { IconProps } from '../base/createIcon'

export default EggOutline
