/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M351.82 271.87v-16A96.15 96.15 0 00184.09 192m-24.2 48.17v16A96.22 96.22 0 00327.81 320'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M135.87 256L159.46 232.4 184.13 256'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M376.13 256L352.54 279.6 327.87 256'/>
    </svg>
)

const SyncCircleOutline = createIcon(svgElement)

SyncCircleOutline.displayName = 'SyncCircleOutline'

export { IconProps } from '../base/createIcon'

export default SyncCircleOutline
