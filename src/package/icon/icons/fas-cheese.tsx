import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-cheese`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M0 288v160a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V288zM299.83 32a32 32 0 0 0-21.13 7L0 256h512c0-119.89-94-217.8-212.17-224z'/>
    </svg>
)

const FasCheese = createIcon(svgElement)

FasCheese.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasCheese
