/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M364.13 125.25L87 403 64 448 108.99 425 386.75 147.87 364.13 125.25z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M420.69 68.69l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z'/>
    </svg>
)

const PencilOutline = createIcon(svgElement)

PencilOutline.displayName = 'PencilOutline'

export { IconProps } from '../base/createIcon'

export default PencilOutline
