/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='448' height='352' x='32' y='112' fill='none' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M144 112V80a32 32 0 0132-32h160a32 32 0 0132 32v32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 208L256 368'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 288L176 288'/>
    </svg>
)

const MedkitOutline = createIcon(svgElement)

MedkitOutline.displayName = 'MedkitOutline'

export { IconProps } from '../base/createIcon'

export default MedkitOutline
