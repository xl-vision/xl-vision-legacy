/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' d='M68.4 192A20.38 20.38 0 0048 212.2a17.87 17.87 0 00.8 5.5L100.5 400a40.46 40.46 0 0039.1 29.5h232.8a40.88 40.88 0 0039.3-29.5l51.7-182.3.6-5.5a20.38 20.38 0 00-20.4-20.2H68.4zm193.32 160.07A42.07 42.07 0 11304 310a42.27 42.27 0 01-42.28 42.07z'/><path fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' d='M160 192L256 64 352 192'/>
    </svg>
)

const BasketOutline = createIcon(svgElement)

BasketOutline.displayName = 'BasketOutline'

export { IconProps } from '../base/createIcon'

export default BasketOutline
