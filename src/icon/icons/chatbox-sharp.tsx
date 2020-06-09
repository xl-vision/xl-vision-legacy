/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path d='M128 464v-80H56a24 24 0 01-24-24V72a24 24 0 0124-24h400a24 24 0 0124 24v288a24 24 0 01-24 24H245.74zM456 80z'/>
    </svg>
)

const ChatboxSharp = createIcon(svgElement)

ChatboxSharp.displayName = 'ChatboxSharp'

export { IconProps } from '../base/createIcon'

export default ChatboxSharp
