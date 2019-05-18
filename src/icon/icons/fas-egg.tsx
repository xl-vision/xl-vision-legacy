import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-egg`
const svgElement = (
    <svg viewBox='0 0 384 512'>
        <path d='M192 0C86 0 0 214 0 320s86 192 192 192 192-86 192-192S298 0 192 0z'/>
    </svg>
)

const FasEgg = createIcon(svgElement)

FasEgg.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasEgg
