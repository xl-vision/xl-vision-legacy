/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M0 130v252a18 18 0 0018 18h476a18 18 0 0018-18V130a18 18 0 00-18-18H18a18 18 0 00-18 18zm448 234H64V148h384z'/>
    </svg>
)

const PhoneLandscapeSharp = createIcon(svgElement)

PhoneLandscapeSharp.displayName = 'PhoneLandscapeSharp'

export { IconProps } from '../base/createIcon'

export default PhoneLandscapeSharp