/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M408 96H252.11a23.89 23.89 0 01-13.31-4L211 73.41A55.77 55.77 0 00179.89 64H104a56.06 56.06 0 00-56 56v24h416c0-30.88-25.12-48-56-48zM423.75 448H88.25a56 56 0 01-55.93-55.15L16.18 228.11v-.28A48 48 0 0164 176h384.1a48 48 0 0147.8 51.83v.28l-16.22 164.74A56 56 0 01423.75 448zm56.15-221.45z'/>
    </svg>
)

const FolderOpen = createIcon(svgElement)

FolderOpen.displayName = 'FolderOpen'

export { IconProps } from '../base/createIcon'

export default FolderOpen