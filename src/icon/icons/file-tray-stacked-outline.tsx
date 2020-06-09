/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinejoin='round' strokeWidth='32' d='M48 336v96a48.14 48.14 0 0048 48h320a48.14 48.14 0 0048-48v-96'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M48 336L192 336'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 336L464 336'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M192 336a64 64 0 00128 0'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M384 32H128c-26 0-43 14-48 40L48 192v96a48.14 48.14 0 0048 48h320a48.14 48.14 0 0048-48v-96L432 72c-5-27-23-40-48-40z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M48 192L192 192'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 192L464 192'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M192 192a64 64 0 00128 0'/>
    </svg>
)

const FileTrayStackedOutline = createIcon(svgElement)

FileTrayStackedOutline.displayName = 'FileTrayStackedOutline'

export { IconProps } from '../base/createIcon'

export default FileTrayStackedOutline
