import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fab-css3`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M480 32l-64 368-223.3 80L0 400l19.6-94.8h82l-8 40.6L210 390.2l134.1-44.4 18.8-97.1H29.5l16-82h333.7l10.5-52.7H56.3l16.3-82H480z'/>
    </svg>
)

const FabCss3 = createIcon(svgElement)

FabCss3.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabCss3
