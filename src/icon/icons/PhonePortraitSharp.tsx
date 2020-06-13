/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M382 0H130a18 18 0 00-18 18v476a18 18 0 0018 18h252a18 18 0 0018-18V18a18 18 0 00-18-18zM148 448V64h216v384z'/>
    </svg>
)

const PhonePortraitSharp = createIcon(svgElement)

PhonePortraitSharp.displayName = 'PhonePortraitSharp'

export { IconProps } from '../base/createIcon'

export default PhonePortraitSharp
