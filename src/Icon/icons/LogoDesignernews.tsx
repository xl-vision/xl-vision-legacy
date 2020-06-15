/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M295.31 122.8L222.86 64 295.54 186.64 295.31 122.8z'/><path d='M339.43 64v195.6h-41.6L225.6 141.28l1.94 118.32h-45.83V131.2L139.09 96c1.14 1.44 2.28 2.88 3.31 4.44 11.43 16.68 17.14 36.6 17.14 60.6 0 59-35 98.52-87.88 98.52H0v.48L228.11 448H512V205.72z'/><path d='M111.89 162.52c0-34.8-16.23-54.12-45.38-54.12H44.57v106.8h21.72c29.71 0 45.6-18.48 45.6-52.68z'/>
    </svg>
)

const LogoDesignernews = createIcon(svgElement)

LogoDesignernews.displayName = 'LogoDesignernews'

export { IconProps } from '../base/createIcon'

export default LogoDesignernews
