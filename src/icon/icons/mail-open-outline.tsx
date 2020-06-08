/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M441.6 171.61L266.87 85.37a24.57 24.57 0 00-21.74 0L70.4 171.61A40 40 0 0048 207.39V392c0 22.09 18.14 40 40.52 40h335c22.38 0 40.52-17.91 40.52-40V207.39a40 40 0 00-22.44-35.78z'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M397.33 368L268.07 267.46a24 24 0 00-29.47 0L109.33 368'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M309.33 295L445.33 192'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M61.33 192L200.33 297'/>
    </svg>
)

const MailOpenOutline = createIcon(svgElement)

MailOpenOutline.displayName = 'MailOpenOutline'

export { IconProps } from '../base/createIcon'

export default MailOpenOutline
