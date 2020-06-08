/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='384' height='256' x='64' y='176' fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' rx='28.87' ry='28.87'/><path stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M144 80L368 80'/><path stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M112 128L400 128'/>
    </svg>
)

const AlbumsOutline = createIcon(svgElement)

AlbumsOutline.displayName = 'AlbumsOutline'

export { IconProps } from '../base/createIcon'

export default AlbumsOutline
