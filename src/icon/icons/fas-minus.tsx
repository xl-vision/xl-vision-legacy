import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-minus`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'/>
    </svg>
)

const FasMinus = createIcon(svgElement)

FasMinus.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasMinus
