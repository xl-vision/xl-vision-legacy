/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 255.79L256 191.79 192 255.79'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 448.21L256 207.79'/>
    </svg>
)

const CloudUploadOutline = createIcon(svgElement)

CloudUploadOutline.displayName = 'CloudUploadOutline'

export { IconProps } from '../base/createIcon'

export default CloudUploadOutline
