/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-window-minimize`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M464 352H48c-26.5 0-48 21.5-48 48v32c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-32c0-26.5-21.5-48-48-48z'/>
    </svg>
)

const FasWindowMinimize = createIcon(svgElement)

FasWindowMinimize.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasWindowMinimize
