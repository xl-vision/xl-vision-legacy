/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M176 48L336 48'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M118 304L394 304'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M208 48v93.48a64.09 64.09 0 01-9.88 34.18L73.21 373.49C48.4 412.78 76.63 464 123.08 464h265.84c46.45 0 74.68-51.22 49.87-90.51L313.87 175.66a64.09 64.09 0 01-9.87-34.18V48'/>
    </svg>
)

const FlaskOutline = createIcon(svgElement)

FlaskOutline.displayName = 'FlaskOutline'

export { IconProps } from '../base/createIcon'

export default FlaskOutline
