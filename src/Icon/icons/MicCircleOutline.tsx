/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M224 368L288 368'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 224.3v23.92c0 39.42-40.58 71.48-80 71.48h0c-39.42 0-80-32.06-80-71.48V224.3'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 320L256 368'/><rect width='96' height='160' x='208' y='128' rx='48' ry='48'/>
    </svg>
)

const MicCircleOutline = createIcon(svgElement)

MicCircleOutline.displayName = 'MicCircleOutline'

export { IconProps } from '../base/createIcon'

export default MicCircleOutline
