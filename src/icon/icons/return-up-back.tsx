/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 160L48 224 112 288'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M64 224h294c58.76 0 106 49.33 106 108v20'/>
    </svg>
)

const ReturnUpBack = createIcon(svgElement)

ReturnUpBack.displayName = 'ReturnUpBack'

export { IconProps } from '../base/createIcon'

export default ReturnUpBack