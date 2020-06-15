/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M96 208H48a16 16 0 010-32h48a16 16 0 010 32z'/><path d='M90.25 90.25L124.19 124.19'/><path d='M124.19 140.19a15.91 15.91 0 01-11.31-4.69l-33.95-33.94a16 16 0 0122.63-22.63l33.94 33.95a16 16 0 01-11.31 27.31zM192 112a16 16 0 01-16-16V48a16 16 0 0132 0v48a16 16 0 01-16 16z'/><path d='M293.89 90.25L259.95 124.19'/><path d='M260 140.19a16 16 0 01-11.31-27.31l33.94-33.95a16 16 0 0122.63 22.63l-33.99 33.94a15.94 15.94 0 01-11.27 4.69z'/><path d='M124.19 259.95L90.25 293.89'/><path d='M90.25 309.89a16 16 0 01-11.32-27.31l33.95-33.94a16 16 0 0122.62 22.63l-33.94 33.94a16 16 0 01-11.31 4.68zM219 151.83a26 26 0 00-36.77 0l-30.43 30.43a26 26 0 000 36.77L208.76 276a4 4 0 005.66 0L276 214.42a4 4 0 000-5.66zM472.31 405.11L304.24 237a4 4 0 00-5.66 0L237 298.58a4 4 0 000 5.66l168.12 168.07a26 26 0 0036.76 0l30.43-30.43a26 26 0 000-36.77z'/>
    </svg>
)

const ColorWand = createIcon(svgElement)

ColorWand.displayName = 'ColorWand'

export { IconProps } from '../base/createIcon'

export default ColorWand
