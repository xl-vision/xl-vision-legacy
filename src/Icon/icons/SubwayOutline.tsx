/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='288' height='352' x='112' y='32' fill='none' strokeMiterlimit='10' strokeWidth='32' rx='48' ry='48'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M208 80L304 80'/><rect width='288' height='96' x='112' y='128' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='32' ry='32'/><circle cx='176' cy='320' r='16' fill='none' strokeLinejoin='round' strokeWidth='32'/><circle cx='336' cy='320' r='16' fill='none' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M144 464L368 464'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 432L384 480'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 432L128 480'/>
    </svg>
)

const SubwayOutline = createIcon(svgElement)

SubwayOutline.displayName = 'SubwayOutline'

export { IconProps } from '../base/createIcon'

export default SubwayOutline
