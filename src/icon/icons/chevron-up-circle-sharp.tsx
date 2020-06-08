/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm96 270.63l-96-96-96 96L137.37 296 256 177.37 374.63 296z'/>
    </svg>
)

const ChevronUpCircleSharp = createIcon(svgElement)

ChevronUpCircleSharp.displayName = 'ChevronUpCircleSharp'

export { IconProps } from '../base/createIcon'

export default ChevronUpCircleSharp
