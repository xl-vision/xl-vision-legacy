/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M224 184L352 184'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M224 256L352 256'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M224 327L352 327'/><path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M448 258c0-106-86-192-192-192S64 152 64 258s86 192 192 192 192-86 192-192z'/><circle cx='168' cy='184' r='8' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='168' cy='257' r='8' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='168' cy='328' r='8' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/>
    </svg>
)

const ListCircleOutline = createIcon(svgElement)

ListCircleOutline.displayName = 'ListCircleOutline'

export { IconProps } from '../base/createIcon'

export default ListCircleOutline
