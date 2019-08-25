/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-bookmark`
const svgElement = (
    <svg viewBox='0 0 384 512'>
        <path d='M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z'/>
    </svg>
)

const FasBookmark = createIcon(svgElement)

FasBookmark.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasBookmark
