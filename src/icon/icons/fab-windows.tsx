/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fab-windows`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z'/>
    </svg>
)

const FabWindows = createIcon(svgElement)

FabWindows.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabWindows
