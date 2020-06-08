/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M420 192h-68v-80a96 96 0 10-192 0v80H92a12 12 0 00-12 12v280a12 12 0 0012 12h328a12 12 0 0012-12V204a12 12 0 00-12-12zm-106 0H198v-80.75a58 58 0 11116 0z'/>
    </svg>
)

const LockClosedSharp = createIcon(svgElement)

LockClosedSharp.displayName = 'LockClosedSharp'

export { IconProps } from '../base/createIcon'

export default LockClosedSharp
