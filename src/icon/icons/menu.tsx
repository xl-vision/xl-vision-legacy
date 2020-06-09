/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='48' d='M88 152L424 152'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='48' d='M88 256L424 256'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='48' d='M88 360L424 360'/>
    </svg>
)

const Menu = createIcon(svgElement)

Menu.displayName = 'Menu'

export { IconProps } from '../base/createIcon'

export default Menu
