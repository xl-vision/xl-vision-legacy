/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <circle cx='128' cy='256' r='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='384' cy='112' r='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='384' cy='400' r='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M169.83 279.53L342.17 376.47'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M342.17 135.53L169.83 232.47'/>
    </svg>
)

const ShareSocialOutline = createIcon(svgElement)

ShareSocialOutline.displayName = 'ShareSocialOutline'

export { IconProps } from '../base/createIcon'

export default ShareSocialOutline
