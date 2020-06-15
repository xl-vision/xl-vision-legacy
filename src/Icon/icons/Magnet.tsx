/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M191.98 463.79L191.98 415.79'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M90.16 421.61L124.1 387.67'/><path strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M47.98 319.79L95.98 319.79'/><path d='M267.56 312.32l-31.11 31.11a16 16 0 000 22.63l45.26 45.25a16 16 0 0022.62 0l31.12-31.11a4 4 0 000-5.66l-62.23-62.22a4 4 0 00-5.66 0zM131.8 176.55l-31.11 31.12a16 16 0 000 22.62l45.25 45.26a16 16 0 0022.63 0l31.11-31.11a4 4 0 000-5.66l-62.22-62.23a4 4 0 00-5.66 0zM428.85 83.28a144 144 0 00-203.71-.06l-65.06 65.05a4 4 0 000 5.66l62.23 62.22a4 4 0 005.66 0l65-65.05a48 48 0 0168.46.59c18.3 18.92 17.47 49.24-1.14 67.85L295.85 284a4 4 0 000 5.66l62.22 62.23a4 4 0 005.66 0l64.08-64.08c56.37-56.34 57.37-148.13 1.04-204.53z'/>
    </svg>
)

const Magnet = createIcon(svgElement)

Magnet.displayName = 'Magnet'

export { IconProps } from '../base/createIcon'

export default Magnet
