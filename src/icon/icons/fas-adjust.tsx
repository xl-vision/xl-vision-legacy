/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-adjust`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966 8 256 8 8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184 0 101.705-82.311 184-184 184z'/>
    </svg>
)

const FasAdjust = createIcon(svgElement)

FasAdjust.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasAdjust
