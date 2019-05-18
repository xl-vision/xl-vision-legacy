import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-angle-left`
const svgElement = (
    <svg viewBox='0 0 256 512'>
        <path d='M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z'/>
    </svg>
)

const FasAngleLeft = createIcon(svgElement)

FasAngleLeft.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasAngleLeft
