import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-divide`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'/>
    </svg>
)

const FasDivide = createIcon(svgElement)

FasDivide.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasDivide
