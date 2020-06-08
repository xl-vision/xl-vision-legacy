/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 176L217.6 336 160 272'/><rect width='384' height='384' x='64' y='64' fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/>
    </svg>
)

const CheckboxOutline = createIcon(svgElement)

CheckboxOutline.displayName = 'CheckboxOutline'

export { IconProps } from '../base/createIcon'

export default CheckboxOutline
