/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M256 96L256 56'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M256 456L256 416'/><path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M256 112a144 144 0 10144 144 144 144 0 00-144-144z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M416 256L456 256'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M56 256L96 256'/>
    </svg>
)

const LocateOutline = createIcon(svgElement)

LocateOutline.displayName = 'LocateOutline'

export { IconProps } from '../base/createIcon'

export default LocateOutline
