import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-tablet`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M400 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM224 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z'/>
    </svg>
)

const FasTablet = createIcon(svgElement)

FasTablet.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasTablet
