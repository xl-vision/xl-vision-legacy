/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 208v-95a80 80 0 00-160 0v95'/><rect width='320' height='272' x='96' y='208' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/>
    </svg>
)

const LockClosedOutline = createIcon(svgElement)

LockClosedOutline.displayName = 'LockClosedOutline'

export { IconProps } from '../base/createIcon'

export default LockClosedOutline
