/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M220 220L252 220 252 336'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M208 340L296 340'/><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z'/>
    </svg>
)

const InformationCircleOutline = createIcon(svgElement)

InformationCircleOutline.displayName = 'InformationCircleOutline'

export { IconProps } from '../base/createIcon'

export default InformationCircleOutline
