/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm62.63 304L296 374.63 177.37 256 296 137.37 318.63 160l-96 96z'/>
    </svg>
)

const ChevronBackCircleSharp = createIcon(svgElement)

ChevronBackCircleSharp.displayName = 'ChevronBackCircleSharp'

export { IconProps } from '../base/createIcon'

export default ChevronBackCircleSharp