/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='32' d='M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z'/>
    </svg>
)

const ChatboxOutline = createIcon(svgElement)

ChatboxOutline.displayName = 'ChatboxOutline'

export { IconProps } from '../base/createIcon'

export default ChatboxOutline
