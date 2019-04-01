import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-grip-lines`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z'/>
    </svg>
)

const FasGripLines = createIcon(svgElement)

FasGripLines.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasGripLines
