import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-mobile`
const svgElement = (
    <svg viewBox='0 0 320 512'>
        <path d='M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z'/>
    </svg>
)

const FasMobile = createIcon(svgElement)

FasMobile.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasMobile
