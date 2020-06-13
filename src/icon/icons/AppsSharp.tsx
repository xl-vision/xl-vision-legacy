/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='112' height='112' x='48' y='48' rx='8' ry='8'/><rect width='112' height='112' x='200' y='48' rx='8' ry='8'/><rect width='112' height='112' x='352' y='48' rx='8' ry='8'/><rect width='112' height='112' x='48' y='200' rx='8' ry='8'/><rect width='112' height='112' x='200' y='200' rx='8' ry='8'/><rect width='112' height='112' x='352' y='200' rx='8' ry='8'/><rect width='112' height='112' x='48' y='352' rx='8' ry='8'/><rect width='112' height='112' x='200' y='352' rx='8' ry='8'/><rect width='112' height='112' x='352' y='352' rx='8' ry='8'/>
    </svg>
)

const AppsSharp = createIcon(svgElement)

AppsSharp.displayName = 'AppsSharp'

export { IconProps } from '../base/createIcon'

export default AppsSharp
