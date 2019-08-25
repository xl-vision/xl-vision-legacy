/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-republican`
const svgElement = (
    <svg viewBox='0 0 640 512'>
        <path d='M544 192c0-88.4-71.6-160-160-160H160C71.6 32 0 103.6 0 192v64h544v-64zm-367.7-21.6l-19.8 19.3 4.7 27.3c.8 4.9-4.3 8.6-8.7 6.3L128 210.4l-24.5 12.9c-4.3 2.3-9.5-1.4-8.7-6.3l4.7-27.3-19.8-19.3c-3.6-3.5-1.6-9.5 3.3-10.2l27.4-4 12.2-24.8c2.2-4.5 8.6-4.4 10.7 0l12.2 24.8 27.4 4c5 .7 6.9 6.7 3.4 10.2zm144 0l-19.8 19.3 4.7 27.3c.8 4.9-4.3 8.6-8.7 6.3L272 210.4l-24.5 12.9c-4.3 2.3-9.5-1.4-8.7-6.3l4.7-27.3-19.8-19.3c-3.6-3.5-1.6-9.5 3.3-10.2l27.4-4 12.2-24.8c2.2-4.5 8.6-4.4 10.7 0l12.2 24.8 27.4 4c5 .7 6.9 6.7 3.4 10.2zm144 0l-19.8 19.3 4.7 27.3c.8 4.9-4.3 8.6-8.7 6.3L416 210.4l-24.5 12.9c-4.3 2.3-9.5-1.4-8.7-6.3l4.7-27.3-19.8-19.3c-3.6-3.5-1.6-9.5 3.3-10.2l27.4-4 12.2-24.8c2.2-4.5 8.6-4.4 10.7 0l12.2 24.8 27.4 4c5 .7 6.9 6.7 3.4 10.2zM624 320h-32c-8.8 0-16 7.2-16 16v64c0 8.8-7.2 16-16 16s-16-7.2-16-16V288H0v176c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16v-80h192v80c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V352h32v43.3c0 41.8 30 80.1 71.6 84.3 47.8 4.9 88.4-32.7 88.4-79.6v-64c0-8.8-7.2-16-16-16z'/>
    </svg>
)

const FasRepublican = createIcon(svgElement)

FasRepublican.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasRepublican
