/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M352 296L256 200 160 296'/><path fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z'/>
    </svg>
)

const ChevronUpCircleOutline = createIcon(svgElement)

ChevronUpCircleOutline.displayName = 'ChevronUpCircleOutline'

export { IconProps } from '../base/createIcon'

export default ChevronUpCircleOutline
