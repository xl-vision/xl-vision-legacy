/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeMiterlimit='10' strokeWidth='32' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 176L256 336'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 256L176 256'/>
    </svg>
)

const AddCircleOutline = createIcon(svgElement)

AddCircleOutline.displayName = 'AddCircleOutline'

export { IconProps } from '../base/createIcon'

export default AddCircleOutline