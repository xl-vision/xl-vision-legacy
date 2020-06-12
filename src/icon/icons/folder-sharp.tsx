/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M16 420a28 28 0 0028 28h424a28 28 0 0028-28V208H16zM496 124a28 28 0 00-28-28H212.84l-48-32H44a28 28 0 00-28 28v84h480z'/>
    </svg>
)

const FolderSharp = createIcon(svgElement)

FolderSharp.displayName = 'FolderSharp'

export { IconProps } from '../base/createIcon'

export default FolderSharp