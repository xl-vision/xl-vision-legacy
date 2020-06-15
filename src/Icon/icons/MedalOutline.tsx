/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='256' cy='352' r='112' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><circle cx='256' cy='352' r='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M147 323L41.84 159.32a32 32 0 01-1.7-31.61l31-62A32 32 0 0199.78 48h312.44a32 32 0 0128.62 17.69l31 62a32 32 0 01-1.7 31.61L365 323'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M371 144L37 144'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M428.74 52.6L305 250'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M140.55 144L207 250'/>
    </svg>
)

const MedalOutline = createIcon(svgElement)

MedalOutline.displayName = 'MedalOutline'

export { IconProps } from '../base/createIcon'

export default MedalOutline
