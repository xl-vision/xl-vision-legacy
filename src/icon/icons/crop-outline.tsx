/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M144 48v272a48 48 0 0048 48h272'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 304V192a48 48 0 00-48-48H208'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 368L368 464'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M144 144L48 144'/>
    </svg>
)

const CropOutline = createIcon(svgElement)

CropOutline.displayName = 'CropOutline'

export { IconProps } from '../base/createIcon'

export default CropOutline