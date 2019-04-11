import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-sort`
const svgElement = (
    <svg viewBox='0 0 320 512'>
        <path d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z'/>
    </svg>
)

const FasSort = createIcon(svgElement)

FasSort.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasSort