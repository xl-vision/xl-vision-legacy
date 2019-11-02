/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fab-figma`
const svgElement = (
    <svg viewBox='0 0 384 512'>
        <path d='M277 170.7A85.35 85.35 0 00277 0H106.3a85.3 85.3 0 000 170.6 85.35 85.35 0 000 170.7 85.35 85.35 0 1085.3 85.4v-256zm0 0a85.3 85.3 0 1085.3 85.3 85.31 85.31 0 00-85.3-85.3z'/>
    </svg>
)

const FabFigma = createIcon(svgElement)

FabFigma.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabFigma
