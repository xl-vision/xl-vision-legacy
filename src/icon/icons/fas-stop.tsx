import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-stop`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z'/>
    </svg>
)

const FasStop = createIcon(svgElement)

FasStop.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasStop
