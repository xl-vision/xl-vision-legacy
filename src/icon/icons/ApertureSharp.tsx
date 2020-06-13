/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M216 48L345.49 176.18 345.49 48 216 48z'/><path d='M181.47 58.38L80 134 256 134 181.47 58.38z'/><path d='M336 344L464 344 464 216 336 344z'/><path d='M454 182L378 80 378 256 454 182z'/><path d='M48 166L48 294 176 166 48 166z'/><path d='M330 454L432 378 256 378 330 454z'/><path d='M58 330L134 432 134 256 58 330z'/><path d='M345.49 222.12l-55.55-55.46h-67.88l-55.55 55.46v67.76l55.62 55.52c.44 0 .88-.06 1.33-.06h66.48l55.55-55.46z'/><path d='M165.98 336.09L166 464 294 464 165.98 336.09z'/>
    </svg>
)

const ApertureSharp = createIcon(svgElement)

ApertureSharp.displayName = 'ApertureSharp'

export { IconProps } from '../base/createIcon'

export default ApertureSharp
