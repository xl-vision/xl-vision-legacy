import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-far-window-minimize`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M480 480H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h448c17.7 0 32 14.3 32 32s-14.3 32-32 32z'/>
    </svg>
)

const FarWindowMinimize = createIcon(svgElement)

FarWindowMinimize.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FarWindowMinimize
