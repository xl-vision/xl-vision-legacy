/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <circle cx='216' cy='296' r='152' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M448 160L448 64 352 64'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M324 188L448 64'/>
    </svg>
)

const MaleOutline = createIcon(svgElement)

MaleOutline.displayName = 'MaleOutline'

export { IconProps } from '../base/createIcon'

export default MaleOutline
