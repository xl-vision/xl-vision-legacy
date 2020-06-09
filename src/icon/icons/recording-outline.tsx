/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='128' cy='256' r='96' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='384' cy='256' r='96' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M128 352L384 352'/>
    </svg>
)

const RecordingOutline = createIcon(svgElement)

RecordingOutline.displayName = 'RecordingOutline'

export { IconProps } from '../base/createIcon'

export default RecordingOutline
