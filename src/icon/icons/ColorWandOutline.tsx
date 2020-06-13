/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='63.03' height='378.2' x='280.48' y='122.9' fill='none' strokeMiterlimit='10' strokeWidth='32' rx='10' ry='10' transform='rotate(-45 312.002 311.994)'/><path d='M180.35 164.45H243.64V259.54999999999995H180.35z' transform='rotate(-45 212.002 211.996)'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M48 192L96 192'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M90.18 90.18L124.12 124.12'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M192 48L192 96'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M293.82 90.18L259.88 124.12'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M124.12 259.88L90.18 293.82'/>
    </svg>
)

const ColorWandOutline = createIcon(svgElement)

ColorWandOutline.displayName = 'ColorWandOutline'

export { IconProps } from '../base/createIcon'

export default ColorWandOutline
