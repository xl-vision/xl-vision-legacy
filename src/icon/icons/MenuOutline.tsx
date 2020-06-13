/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M80 160L432 160'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M80 256L432 256'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M80 352L432 352'/>
    </svg>
)

const MenuOutline = createIcon(svgElement)

MenuOutline.displayName = 'MenuOutline'

export { IconProps } from '../base/createIcon'

export default MenuOutline
