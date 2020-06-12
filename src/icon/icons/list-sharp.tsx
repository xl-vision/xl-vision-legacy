/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' strokeLinejoin='round' strokeWidth='48' d='M144 144L464 144'/><path fill='none' strokeLinejoin='round' strokeWidth='48' d='M144 256L464 256'/><path fill='none' strokeLinejoin='round' strokeWidth='48' d='M144 368L464 368'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M64 128H96V160H64z'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M64 240H96V272H64z'/><path fill='none' strokeLinecap='square' strokeLinejoin='round' strokeWidth='32' d='M64 352H96V384H64z'/>
    </svg>
)

const ListSharp = createIcon(svgElement)

ListSharp.displayName = 'ListSharp'

export { IconProps } from '../base/createIcon'

export default ListSharp