/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <ellipse cx='256' cy='128' fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' rx='192' ry='80'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M448 214c0 44.18-86 80-192 80S64 258.18 64 214M448 300c0 44.18-86 80-192 80S64 344.18 64 300'/><path fill='none' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M64 127.24v257.52C64 428.52 150 464 256 464s192-35.48 192-79.24V127.24'/>
    </svg>
)

const ServerOutline = createIcon(svgElement)

ServerOutline.displayName = 'ServerOutline'

export { IconProps } from '../base/createIcon'

export default ServerOutline