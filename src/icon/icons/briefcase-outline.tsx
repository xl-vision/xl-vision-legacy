/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='448' height='320' x='32' y='128' fill='none' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M144 128V96a32 32 0 0132-32h160a32 32 0 0132 32v32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M480 240L32 240'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 240v24a8 8 0 01-8 8H200a8 8 0 01-8-8v-24'/>
    </svg>
)

const BriefcaseOutline = createIcon(svgElement)

BriefcaseOutline.displayName = 'BriefcaseOutline'

export { IconProps } from '../base/createIcon'

export default BriefcaseOutline