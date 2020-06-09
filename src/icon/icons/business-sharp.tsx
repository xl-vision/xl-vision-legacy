/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M320 176V16H32v480h128v-96h32v96h288V176zM112 432H80v-32h32zm0-80H80v-32h32zm0-80H80v-32h32zm0-80H80v-32h32zm0-80H80V80h32zm128-32h32v32h-32zm-48 272h-32v-32h32zm0-80h-32v-32h32zm0-80h-32v-32h32zm0-80h-32V80h32zm80 320h-32v-32h32zm0-80h-32v-32h32zm0-80h-32v-32h32zm0-80h-32v-32h32v32zm176 272H320v-32h32v-32h-32v-48h32v-32h-32v-48h32v-32h-32v-32h128z'/><path d='M384 400H416V432H384z'/><path d='M384 320H416V352H384z'/><path d='M384 240H416V272H384z'/>
    </svg>
)

const BusinessSharp = createIcon(svgElement)

BusinessSharp.displayName = 'BusinessSharp'

export { IconProps } from '../base/createIcon'

export default BusinessSharp
