/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M160 368L32 256 160 144'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 368L480 256 352 144'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M304 96L208 416'/>
    </svg>
)

const CodeSlashOutline = createIcon(svgElement)

CodeSlashOutline.displayName = 'CodeSlashOutline'

export { IconProps } from '../base/createIcon'

export default CodeSlashOutline
