/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 112a80 80 0 00-160 0v96'/><rect width='320' height='272' x='96' y='208' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/>
    </svg>
)

const LockOpenOutline = createIcon(svgElement)

LockOpenOutline.displayName = 'LockOpenOutline'

export { IconProps } from '../base/createIcon'

export default LockOpenOutline
