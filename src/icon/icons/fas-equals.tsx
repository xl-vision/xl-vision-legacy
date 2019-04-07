import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-equals`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M416 304H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32zm0-192H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'/>
    </svg>
)

const FasEquals = createIcon(svgElement)

FasEquals.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasEquals
