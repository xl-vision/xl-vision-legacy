/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M48 112L336 112'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M192 64L192 112'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M272 448L368 224 464 448'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M301.5 384L434.5 384'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M281.3 112S257 206 199 277 80 384 80 384'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 336s-35-27-72-75-56-85-56-85'/>
    </svg>
)

const LanguageOutline = createIcon(svgElement)

LanguageOutline.displayName = 'LanguageOutline'

export { IconProps } from '../base/createIcon'

export default LanguageOutline