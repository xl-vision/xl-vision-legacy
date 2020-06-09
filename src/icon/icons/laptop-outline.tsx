/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='416' height='304' x='48' y='96' fill='none' strokeLinejoin='round' strokeWidth='32' rx='32.14' ry='32.14'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M16 416L496 416'/>
    </svg>
)

const LaptopOutline = createIcon(svgElement)

LaptopOutline.displayName = 'LaptopOutline'

export { IconProps } from '../base/createIcon'

export default LaptopOutline
