import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fab-strava`
const svgElement = (
    <svg viewBox='0 0 384 512'>
        <path d='M158.4 0L7 292h89.2l62.2-116.1L220.1 292h88.5zm150.2 292l-43.9 88.2-44.6-88.2h-67.6l112.2 220 111.5-220z'/>
    </svg>
)

const FabStrava = createIcon(svgElement)

FabStrava.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabStrava