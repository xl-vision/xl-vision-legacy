/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 464c114.87 0 208-93.13 208-208S370.87 48 256 48 48 141.13 48 256s93.13 208 208 208zm-96-270.63l96 96 96-96L374.63 216 256 334.63 137.37 216z'/>
    </svg>
)

const ChevronDownCircleSharp = createIcon(svgElement)

ChevronDownCircleSharp.displayName = 'ChevronDownCircleSharp'

export { IconProps } from '../base/createIcon'

export default ChevronDownCircleSharp