import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-align-right`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M160 84V44c0-8.837 7.163-16 16-16h256c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H176c-8.837 0-16-7.163-16-16zM16 228h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 256h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm160-128h256c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H176c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'/>
    </svg>
)

const FasAlignRight = createIcon(svgElement)

FasAlignRight.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasAlignRight
