/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-border-style`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M240 416h-32a16 16 0 00-16 16v32a16 16 0 0016 16h32a16 16 0 0016-16v-32a16 16 0 00-16-16zm-96 0h-32a16 16 0 00-16 16v32a16 16 0 0016 16h32a16 16 0 0016-16v-32a16 16 0 00-16-16zm192 0h-32a16 16 0 00-16 16v32a16 16 0 0016 16h32a16 16 0 0016-16v-32a16 16 0 00-16-16zm96-192h-32a16 16 0 00-16 16v32a16 16 0 0016 16h32a16 16 0 0016-16v-32a16 16 0 00-16-16zm0 96h-32a16 16 0 00-16 16v32a16 16 0 0016 16h32a16 16 0 0016-16v-32a16 16 0 00-16-16zm0 96h-32a16 16 0 00-16 16v32a16 16 0 0016 16h32a16 16 0 0016-16v-32a16 16 0 00-16-16zm0-288h-32a16 16 0 00-16 16v32a16 16 0 0016 16h32a16 16 0 0016-16v-32a16 16 0 00-16-16zm0-96H32A32 32 0 000 64v400a16 16 0 0016 16h32a16 16 0 0016-16V96h368a16 16 0 0016-16V48a16 16 0 00-16-16z'/>
    </svg>
)

const FasBorderStyle = createIcon(svgElement)

FasBorderStyle.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasBorderStyle
