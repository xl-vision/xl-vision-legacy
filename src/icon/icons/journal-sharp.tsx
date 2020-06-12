/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M290 32H104a24 24 0 00-24 24v400a24 24 0 0024 24h186zM408 32h-58v448h58a24 24 0 0024-24V56a24 24 0 00-24-24z'/>
    </svg>
)

const JournalSharp = createIcon(svgElement)

JournalSharp.displayName = 'JournalSharp'

export { IconProps } from '../base/createIcon'

export default JournalSharp