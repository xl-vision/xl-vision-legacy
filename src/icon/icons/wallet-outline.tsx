/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='416' height='288' x='48' y='144' fill='none' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49'/><path d='M368 320a32 32 0 1132-32 32 32 0 01-32 32z'/>
    </svg>
)

const WalletOutline = createIcon(svgElement)

WalletOutline.displayName = 'WalletOutline'

export { IconProps } from '../base/createIcon'

export default WalletOutline