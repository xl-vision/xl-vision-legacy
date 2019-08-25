/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-square-full`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M512 512H0V0h512v512z'/>
    </svg>
)

const FasSquareFull = createIcon(svgElement)

FasSquareFull.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasSquareFull
