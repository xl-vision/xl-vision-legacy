/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M272 352V204.63l64 64L358.63 246 256 143.37 153.37 246 176 268.63l64-64V352H92a12 12 0 01-12-12V44a12 12 0 0112-12h328a12 12 0 0112 12v296a12 12 0 01-12 12z'/><path d='M240 352H272V480H240z'/>
    </svg>
)

const PushSharp = createIcon(svgElement)

PushSharp.displayName = 'PushSharp'

export { IconProps } from '../base/createIcon'

export default PushSharp
