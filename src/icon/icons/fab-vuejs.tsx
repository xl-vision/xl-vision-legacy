import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fab-vuejs`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z'/>
    </svg>
)

const FabVuejs = createIcon(svgElement)

FabVuejs.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabVuejs
