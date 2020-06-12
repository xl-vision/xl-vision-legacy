/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path fill='none' d='M168 72H344V96H168z'/><path d='M484 96H384V40a8 8 0 00-8-8H136a8 8 0 00-8 8v56H28a12 12 0 00-12 12v360a12 12 0 0012 12h456a12 12 0 0012-12V108a12 12 0 00-12-12zM168 72h176v24H168zm184 238h-74v74h-44v-74h-74v-44h74v-74h44v74h74z'/>
    </svg>
)

const MedkitSharp = createIcon(svgElement)

MedkitSharp.displayName = 'MedkitSharp'

export { IconProps } from '../base/createIcon'

export default MedkitSharp