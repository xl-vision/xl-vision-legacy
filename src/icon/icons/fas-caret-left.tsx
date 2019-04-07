import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-caret-left`
const svgElement = (
    <svg viewBox='0 0 192 512'>
        <path d='M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z'/>
    </svg>
)

const FasCaretLeft = createIcon(svgElement)

FasCaretLeft.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasCaretLeft
