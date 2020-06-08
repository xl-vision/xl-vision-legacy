/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='416' height='272' x='48' y='80' fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' rx='32' ry='32'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 416L256 352'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 80L256 48'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M400 464L368 352'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 464L144 352'/>
    </svg>
)

const EaselOutline = createIcon(svgElement)

EaselOutline.displayName = 'EaselOutline'

export { IconProps } from '../base/createIcon'

export default EaselOutline
