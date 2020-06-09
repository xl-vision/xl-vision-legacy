/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M192 448L320 448'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 368L256 448'/><path d='M256 320a78.83 78.83 0 01-56.55-24.1A80.89 80.89 0 01176 239V128a79.69 79.69 0 0180-80c44.86 0 80 35.14 80 80v111c0 44.66-35.89 81-80 81z'/>
    </svg>
)

const Mic = createIcon(svgElement)

Mic.displayName = 'Mic'

export { IconProps } from '../base/createIcon'

export default Mic
