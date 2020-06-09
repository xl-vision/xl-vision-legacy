/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' strokeLinejoin='round' strokeWidth='32' d='M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z'/><circle cx='160' cy='216' r='32'/><circle cx='256' cy='216' r='32'/><circle cx='352' cy='216' r='32'/>
    </svg>
)

const ChatboxEllipsesOutline = createIcon(svgElement)

ChatboxEllipsesOutline.displayName = 'ChatboxEllipsesOutline'

export { IconProps } from '../base/createIcon'

export default ChatboxEllipsesOutline
