import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-dice-two`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm192 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z'/>
    </svg>
)

const FasDiceTwo = createIcon(svgElement)

FasDiceTwo.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasDiceTwo
