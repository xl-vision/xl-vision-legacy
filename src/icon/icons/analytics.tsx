/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M456 128a40 40 0 00-37.23 54.6l-84.17 84.17a39.86 39.86 0 00-29.2 0l-60.17-60.17a40 40 0 10-74.46 0L70.6 306.77a40 40 0 1022.63 22.63L193.4 229.23a39.86 39.86 0 0029.2 0l60.17 60.17a40 40 0 1074.46 0l84.17-84.17A40 40 0 10456 128z'/>
    </svg>
)

const Analytics = createIcon(svgElement)

Analytics.displayName = 'Analytics'

export { IconProps } from '../base/createIcon'

export default Analytics