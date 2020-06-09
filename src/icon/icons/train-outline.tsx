/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M344 48h-24a16 16 0 00-16-16h-96a16 16 0 00-16 16h-24a56.16 56.16 0 00-56 56v247c0 35.3 144 65 144 65s144-29.7 144-65V104a56 56 0 00-56-56zm-88 304a48 48 0 1148-48 48 48 0 01-48 48zm96-160a16 16 0 01-16 16H176a16 16 0 01-16-16v-64a16 16 0 0116-16h160a16 16 0 0116 16z'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M144 464L368 464'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M336 432L384 480'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M176 432L128 480'/>
    </svg>
)

const TrainOutline = createIcon(svgElement)

TrainOutline.displayName = 'TrainOutline'

export { IconProps } from '../base/createIcon'

export default TrainOutline
