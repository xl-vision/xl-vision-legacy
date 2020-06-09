/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <circle cx='216' cy='200' r='136' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M216 352L216 480'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M272 416L160 416'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M432 112L432 32 352 32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M335.28 128.72L432 32'/>
    </svg>
)

const MaleFemaleOutline = createIcon(svgElement)

MaleFemaleOutline.displayName = 'MaleFemaleOutline'

export { IconProps } from '../base/createIcon'

export default MaleFemaleOutline
