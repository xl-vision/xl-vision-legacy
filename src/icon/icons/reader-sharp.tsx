/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M80 44v424a12 12 0 0012 12h328a12 12 0 0012-12V44a12 12 0 00-12-12H92a12 12 0 00-12 12zm192 260H160v-32h112zm80-80H160v-32h192zm0-80H160v-32h192z'/>
    </svg>
)

const ReaderSharp = createIcon(svgElement)

ReaderSharp.displayName = 'ReaderSharp'

export { IconProps } from '../base/createIcon'

export default ReaderSharp
