/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinejoin='round' strokeWidth='32' d='M384 80H128c-26 0-43 14-48 40L48 272v112a48.14 48.14 0 0048 48h320a48.14 48.14 0 0048-48V272l-32-152c-5-27-23-40-48-40z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M48 272L192 272'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 272L464 272'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M192 272a64 64 0 00128 0'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M144 144L368 144'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M128 208L384 208'/>
    </svg>
)

const FileTrayFullOutline = createIcon(svgElement)

FileTrayFullOutline.displayName = 'FileTrayFullOutline'

export { IconProps } from '../base/createIcon'

export default FileTrayFullOutline
