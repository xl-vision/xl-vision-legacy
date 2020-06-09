/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 464L336 464'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 464L256 336'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M384 224c0-50.64-.08-134.63-.12-160a16 16 0 00-16-16l-223.79.26a16 16 0 00-16 15.95c0 30.58-.13 129.17-.13 159.79 0 64.28 83 112 128 112S384 288.28 384 224z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M128 96H48v16c0 55.22 33.55 112 80 112M384 96h80v16c0 55.22-33.55 112-80 112'/>
    </svg>
)

const TrophyOutline = createIcon(svgElement)

TrophyOutline.displayName = 'TrophyOutline'

export { IconProps } from '../base/createIcon'

export default TrophyOutline
