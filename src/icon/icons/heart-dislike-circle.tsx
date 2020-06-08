/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm23.3 299.19c-4.41 3.2-9.16 6.55-14.31 10a15.93 15.93 0 01-18 0c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5v-.64a4 4 0 016.82-2.72l120.95 120.2a4 4 0 01-.46 6.07zm68 16.12a16 16 0 01-22.62 0l-176-176a16 16 0 0122.62-22.62l176 176a16 16 0 01.01 22.62zm-14.1-65.62a3.92 3.92 0 01-6 .37l-124-123.21A4 4 0 01206 168h1.55c20.4 0 35 10.64 44.11 20.42a5.93 5.93 0 008.7 0c9.11-9.78 23.71-20.42 44.11-20.42 30.31 0 55.22 25.27 55.53 56.33.26 25.93-8.52 49.97-26.8 73.36z'/>
    </svg>
)

const HeartDislikeCircle = createIcon(svgElement)

HeartDislikeCircle.displayName = 'HeartDislikeCircle'

export { IconProps } from '../base/createIcon'

export default HeartDislikeCircle
