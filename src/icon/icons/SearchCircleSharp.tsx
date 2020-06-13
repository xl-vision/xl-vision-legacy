/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm80 294.63l-54.15-54.15a88.08 88.08 0 1122.63-22.63L358.63 336z'/><circle cx='232' cy='232' r='56'/>
    </svg>
)

const SearchCircleSharp = createIcon(svgElement)

SearchCircleSharp.displayName = 'SearchCircleSharp'

export { IconProps } from '../base/createIcon'

export default SearchCircleSharp
