/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M80 32l-32 80v304h96v64h64l64-64h80l112-112V32zm336 256l-64 64h-96l-64 64v-64h-80V80h304z'/><path d='M320 143H368V272H320z'/><path d='M208 143H256V272H208z'/>
    </svg>
)

const LogoTwitch = createIcon(svgElement)

LogoTwitch.displayName = 'LogoTwitch'

export { IconProps } from '../base/createIcon'

export default LogoTwitch
