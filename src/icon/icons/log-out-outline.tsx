/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 336L448 256 368 176'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 256L432 256'/>
    </svg>
)

const LogOutOutline = createIcon(svgElement)

LogOutOutline.displayName = 'LogOutOutline'

export { IconProps } from '../base/createIcon'

export default LogOutOutline
