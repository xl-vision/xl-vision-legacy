/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M120 352L96 400'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M136 432L120 464'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M400 352L376 400'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M416 432L400 464'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M208 304L192 400 240 400 240 480 320 368 272 368 288 304'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M404.33 152.89H392.2C384.71 84.85 326.14 32 256 32a136.39 136.39 0 00-128.63 90.67h-4.57c-49.94 0-90.8 40.8-90.8 90.66h0C32 263.2 72.86 304 122.8 304h281.53C446 304 480 270 480 228.44h0c0-41.55-34-75.55-75.67-75.55z'/>
    </svg>
)

const ThunderstormOutline = createIcon(svgElement)

ThunderstormOutline.displayName = 'ThunderstormOutline'

export { IconProps } from '../base/createIcon'

export default ThunderstormOutline