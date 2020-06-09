/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 64L448 64 448 176'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M224 288L440 72'/>
    </svg>
)

const OpenOutline = createIcon(svgElement)

OpenOutline.displayName = 'OpenOutline'

export { IconProps } from '../base/createIcon'

export default OpenOutline
