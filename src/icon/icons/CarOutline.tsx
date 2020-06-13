/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M80 224l37.78-88.15C123.93 121.5 139.6 112 157.11 112h197.78c17.51 0 33.18 9.5 39.33 23.85L432 224'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M80 224H432V368H80z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 368L112 400 80 400 80 368'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M432 368L432 400 400 400 400 368'/><circle cx='144' cy='288' r='16' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='368' cy='288' r='16' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/>
    </svg>
)

const CarOutline = createIcon(svgElement)

CarOutline.displayName = 'CarOutline'

export { IconProps } from '../base/createIcon'

export default CarOutline
