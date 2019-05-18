import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fab-think-peaks`
const svgElement = (
    <svg viewBox='0 0 576 512'>
        <path d='M465.4 409.4l87.1-150.2-32-.3-55.1 95L259.2 0 23 407.4l32 .3L259.2 55.6zm-355.3-44.1h32.1l117.4-202.5L463 511.9l32.5.1-235.8-404.6z'/>
    </svg>
)

const FabThinkPeaks = createIcon(svgElement)

FabThinkPeaks.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabThinkPeaks
