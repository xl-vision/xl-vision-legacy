/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-bread-slice`
const svgElement = (
    <svg viewBox='0 0 576 512'>
        <path d='M288 0C108 0 0 93.4 0 169.14 0 199.44 24.24 224 64 224v256c0 17.67 16.12 32 36 32h376c19.88 0 36-14.33 36-32V224c39.76 0 64-24.56 64-54.86C576 93.4 468 0 288 0z'/>
    </svg>
)

const FasBreadSlice = createIcon(svgElement)

FasBreadSlice.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasBreadSlice
