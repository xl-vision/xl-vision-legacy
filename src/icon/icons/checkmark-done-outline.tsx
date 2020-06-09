/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M464 128L240 384 144 288'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M144 384L48 288'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 128L232 284'/>
    </svg>
)

const CheckmarkDoneOutline = createIcon(svgElement)

CheckmarkDoneOutline.displayName = 'CheckmarkDoneOutline'

export { IconProps } from '../base/createIcon'

export default CheckmarkDoneOutline
