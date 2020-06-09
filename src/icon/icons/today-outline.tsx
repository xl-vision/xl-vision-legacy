/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <rect width='416' height='384' x='48' y='80' fill='none' strokeLinejoin='round' strokeWidth='32' rx='48' ry='48'/><path d='M397.82 80H114.18C77.69 80 48 110.15 48 147.2V192h8c0-16 24-32 40-32h320c16 0 40 16 40 32h8v-44.8c0-37.05-29.69-67.2-66.18-67.2z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M128 48L128 80'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M384 48L384 80'/><rect width='128' height='128' x='96' y='208' rx='28.57' ry='28.57'/><path fill='none' strokeLinejoin='round' strokeWidth='32' d='M464 256v-48a48.14 48.14 0 00-48-48H96a48.14 48.14 0 00-48 48v48'/>
    </svg>
)

const TodayOutline = createIcon(svgElement)

TodayOutline.displayName = 'TodayOutline'

export { IconProps } from '../base/createIcon'

export default TodayOutline
