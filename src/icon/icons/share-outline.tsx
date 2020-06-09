/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 192h40a40 40 0 0140 40v192a40 40 0 01-40 40H136a40 40 0 01-40-40V232a40 40 0 0140-40h40'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 128L256 48 176 128'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 321L256 48'/>
    </svg>
)

const ShareOutline = createIcon(svgElement)

ShareOutline.displayName = 'ShareOutline'

export { IconProps } from '../base/createIcon'

export default ShareOutline
