/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fab-edge`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M25.714 228.163c.111-.162.23-.323.342-.485-.021.162-.045.323-.065.485h-.277zm460.572 15.508c0-44.032-7.754-84.465-28.801-122.405C416.498 47.879 343.912 8.001 258.893 8.001 118.962 7.724 40.617 113.214 26.056 227.679c42.429-61.312 117.073-121.376 220.375-124.966 0 0 109.666 0 99.419 104.957H169.997c6.369-37.386 18.554-58.986 34.339-78.926-75.048 34.893-121.85 96.096-120.742 188.315.83 71.448 50.124 144.836 120.743 171.976 83.357 31.847 192.776 7.2 240.132-21.324V363.307c-80.864 56.494-270.871 60.925-272.255-67.572h314.073v-52.064z'/>
    </svg>
)

const FabEdge = createIcon(svgElement)

FabEdge.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabEdge
