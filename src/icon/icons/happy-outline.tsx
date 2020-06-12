/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='184' cy='232' r='24'/><path d='M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 017.82-10.17h175.69a8 8 0 017.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83z'/><circle cx='328' cy='232' r='24'/><circle cx='256' cy='256' r='208' fill='none' strokeMiterlimit='10' strokeWidth='32'/>
    </svg>
)

const HappyOutline = createIcon(svgElement)

HappyOutline.displayName = 'HappyOutline'

export { IconProps } from '../base/createIcon'

export default HappyOutline