/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' d='M398.57 80H113.43v16S87.51 272 256 272 398.57 96 398.57 96z'/><path fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' d='M256 272L256 432'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 432L160 432'/><path fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' d='M112 160L400 160'/>
    </svg>
)

const WineOutline = createIcon(svgElement)

WineOutline.displayName = 'WineOutline'

export { IconProps } from '../base/createIcon'

export default WineOutline
