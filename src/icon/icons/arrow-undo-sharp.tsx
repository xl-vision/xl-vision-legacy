/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M464 440l-28.12-32.11c-22.48-25.65-43.33-45.45-72.08-58.7-26.61-12.26-60-18.65-104.27-19.84V432L48 252 259.53 72v103.21c72.88 3 127.18 27.08 161.56 71.75C449.56 284 464 335.19 464 399.26z'/>
    </svg>
)

const ArrowUndoSharp = createIcon(svgElement)

ArrowUndoSharp.displayName = 'ArrowUndoSharp'

export { IconProps } from '../base/createIcon'

export default ArrowUndoSharp