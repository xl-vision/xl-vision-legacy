/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M304 384v-24c0-29 31.54-56.43 52-76 28.84-27.57 44-64.61 44-108 0-80-63.73-144-144-144a143.6 143.6 0 00-144 144c0 41.84 15.81 81.39 44 108 20.35 19.21 52 46.7 52 76v24'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M224 480L288 480'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M208 432L304 432'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 384L256 256'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M294 240s-21.51 16-38 16-38-16-38-16'/>
    </svg>
)

const BulbOutline = createIcon(svgElement)

BulbOutline.displayName = 'BulbOutline'

export { IconProps } from '../base/createIcon'

export default BulbOutline