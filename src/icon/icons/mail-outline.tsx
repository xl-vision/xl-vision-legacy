/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='416' height='320' x='48' y='96' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='40' ry='40'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 160L256 272 400 160'/>
    </svg>
)

const MailOutline = createIcon(svgElement)

MailOutline.displayName = 'MailOutline'

export { IconProps } from '../base/createIcon'

export default MailOutline