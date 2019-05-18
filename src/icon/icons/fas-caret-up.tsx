import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-caret-up`
const svgElement = (
    <svg viewBox='0 0 320 512'>
        <path d='M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z'/>
    </svg>
)

const FasCaretUp = createIcon(svgElement)

FasCaretUp.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasCaretUp
