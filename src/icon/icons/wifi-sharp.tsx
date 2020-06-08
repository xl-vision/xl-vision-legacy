/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='square' strokeLinejoin='round' strokeWidth='42' d='M332.69 320a115 115 0 00-152.8 0M393.74 259a201.26 201.26 0 00-274.92 0M448 191.52a288 288 0 00-383.44 0'/><path d='M300.67 384L256 433l-44.34-49a56.73 56.73 0 0188.92 0z'/>
    </svg>
)

const WifiSharp = createIcon(svgElement)

WifiSharp.displayName = 'WifiSharp'

export { IconProps } from '../base/createIcon'

export default WifiSharp
