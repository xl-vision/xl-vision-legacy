/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='256' cy='256' r='26' strokeMiterlimit='10' strokeWidth='10'/><circle cx='346' cy='256' r='26' strokeMiterlimit='10' strokeWidth='10'/><circle cx='166' cy='256' r='26' strokeMiterlimit='10' strokeWidth='10'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='42' d='M160 368L32 256 160 144'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='42' d='M352 368L480 256 352 144'/>
    </svg>
)

const CodeWorking = createIcon(svgElement)

CodeWorking.displayName = 'CodeWorking'

export { IconProps } from '../base/createIcon'

export default CodeWorking
