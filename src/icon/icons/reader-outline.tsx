/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <rect width='320' height='416' x='96' y='48' fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 128L336 128'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 208L336 208'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 288L256 288'/>
    </svg>
)

const ReaderOutline = createIcon(svgElement)

ReaderOutline.displayName = 'ReaderOutline'

export { IconProps } from '../base/createIcon'

export default ReaderOutline
