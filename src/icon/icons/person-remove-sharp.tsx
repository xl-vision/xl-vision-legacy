/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M16 214H160V250H16z'/><circle cx='288' cy='144' r='112'/><path d='M288 288c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128z'/>
    </svg>
)

const PersonRemoveSharp = createIcon(svgElement)

PersonRemoveSharp.displayName = 'PersonRemoveSharp'

export { IconProps } from '../base/createIcon'

export default PersonRemoveSharp
