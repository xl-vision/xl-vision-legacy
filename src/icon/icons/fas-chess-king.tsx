import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-chess-king`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M400 448H48a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm16-288H256v-48h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8h-40V8a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v40h-40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40v48H32a32 32 0 0 0-30.52 41.54L74.56 416h298.88l73.08-214.46A32 32 0 0 0 416 160z'/>
    </svg>
)

const FasChessKing = createIcon(svgElement)

FasChessKing.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasChessKing
