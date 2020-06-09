/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M304 416L304 304 416 304'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M314.2 314.23L432 432'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M208 96L208 208 96 208'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M197.8 197.77L80 80'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M416 208L304 208 304 96'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M314.23 197.8L432 80'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M96 304L208 304 208 416'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M197.77 314.2L80 432'/>
    </svg>
)

const Contract = createIcon(svgElement)

Contract.displayName = 'Contract'

export { IconProps } from '../base/createIcon'

export default Contract
