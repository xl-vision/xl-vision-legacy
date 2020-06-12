/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M96 256L416 256'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M96 176L416 176'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M96 336L416 336'/>
    </svg>
)

const ReorderThreeOutline = createIcon(svgElement)

ReorderThreeOutline.displayName = 'ReorderThreeOutline'

export { IconProps } from '../base/createIcon'

export default ReorderThreeOutline