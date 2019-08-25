/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-glass-whiskey`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M480 32H32C12.5 32-2.4 49.2.3 68.5l56 356.5c4.5 31.5 31.5 54.9 63.4 54.9h273c31.8 0 58.9-23.4 63.4-54.9l55.6-356.5C514.4 49.2 499.5 32 480 32zm-37.4 64l-30 192h-313L69.4 96h373.2z'/>
    </svg>
)

const FasGlassWhiskey = createIcon(svgElement)

FasGlassWhiskey.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasGlassWhiskey
