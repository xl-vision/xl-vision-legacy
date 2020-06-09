/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <circle cx='256' cy='256' r='208' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='256' cy='256' r='80' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M208 54L216 186'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M296 186L304 54'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M208 458L216 326'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M296 326L304 458'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M458 208L326 216'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M326 296L458 304'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M54 208L186 216'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M186 296L54 304'/>
    </svg>
)

const HelpBuoyOutline = createIcon(svgElement)

HelpBuoyOutline.displayName = 'HelpBuoyOutline'

export { IconProps } from '../base/createIcon'

export default HelpBuoyOutline
