/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M256 80a176 176 0 10176 176A176 176 0 00256 80z'/><path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M232 160a72 72 0 1072 72 72 72 0 00-72-72z'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M283.64 283.64L336 336'/>
    </svg>
)

const SearchCircleOutline = createIcon(svgElement)

SearchCircleOutline.displayName = 'SearchCircleOutline'

export { IconProps } from '../base/createIcon'

export default SearchCircleOutline
