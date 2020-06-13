/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M338.29 338.29L448 448'/>
    </svg>
)

const SearchOutline = createIcon(svgElement)

SearchOutline.displayName = 'SearchOutline'

export { IconProps } from '../base/createIcon'

export default SearchOutline
