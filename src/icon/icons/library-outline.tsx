/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='64' height='368' x='32' y='96' fill='none' strokeLinejoin='round' strokeWidth='32' rx='16' ry='16'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 224L240 224'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 400L240 400'/><rect width='128' height='304' x='112' y='160' fill='none' strokeLinejoin='round' strokeWidth='32' rx='16' ry='16'/><rect width='96' height='416' x='256' y='48' fill='none' strokeLinejoin='round' strokeWidth='32' rx='16' ry='16'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M422.46 96.11l-40.4 4.25c-11.12 1.17-19.18 11.57-17.93 23.1l34.92 321.59c1.26 11.53 11.37 20 22.49 18.84l40.4-4.25c11.12-1.17 19.18-11.57 17.93-23.1L445 115c-1.31-11.58-11.42-20.06-22.54-18.89z'/>
    </svg>
)

const LibraryOutline = createIcon(svgElement)

LibraryOutline.displayName = 'LibraryOutline'

export { IconProps } from '../base/createIcon'

export default LibraryOutline