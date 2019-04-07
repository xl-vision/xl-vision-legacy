import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-clone`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112 0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-48H176z'/>
    </svg>
)

const FasClone = createIcon(svgElement)

FasClone.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasClone
