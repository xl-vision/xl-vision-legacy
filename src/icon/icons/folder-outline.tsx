/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M440 432H72a40 40 0 01-40-40V120a40 40 0 0140-40h75.89a40 40 0 0122.19 6.72l27.84 18.56a40 40 0 0022.19 6.72H440a40 40 0 0140 40v240a40 40 0 01-40 40z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M32 192L480 192'/>
    </svg>
)

const FolderOutline = createIcon(svgElement)

FolderOutline.displayName = 'FolderOutline'

export { IconProps } from '../base/createIcon'

export default FolderOutline
