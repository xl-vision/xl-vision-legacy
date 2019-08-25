/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-columns`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z'/>
    </svg>
)

const FasColumns = createIcon(svgElement)

FasColumns.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasColumns
