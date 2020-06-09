/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M400 400.33L448 400 448 112 400 112.33'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M112 112L64 112.33 64 400.33 112 400'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M384 192L384 320'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M320 160L320 352'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M256 176L256 336'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M192 160L192 352'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M128 192L128 320'/>
    </svg>
)

const BarcodeSharp = createIcon(svgElement)

BarcodeSharp.displayName = 'BarcodeSharp'

export { IconProps } from '../base/createIcon'

export default BarcodeSharp
