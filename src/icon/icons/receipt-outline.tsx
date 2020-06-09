/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinejoin='round' strokeWidth='32' d='M160 336L160 48 192 64 224 48 255.94 64 288.31 48 320 64 351.79 48 383.72 64 416 48 448.01 64 480 48 480 272'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M480 272v112a80 80 0 01-80 80h0a80 80 0 01-80-80v-48H48a15.86 15.86 0 00-16 16c0 64 6.74 112 80 112h288'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M224 144L416 144'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M288 224L416 224'/>
    </svg>
)

const ReceiptOutline = createIcon(svgElement)

ReceiptOutline.displayName = 'ReceiptOutline'

export { IconProps } from '../base/createIcon'

export default ReceiptOutline
