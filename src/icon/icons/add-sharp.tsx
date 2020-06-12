/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M256 112L256 400'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M400 256L112 256'/>
    </svg>
)

const AddSharp = createIcon(svgElement)

AddSharp.displayName = 'AddSharp'

export { IconProps } from '../base/createIcon'

export default AddSharp