import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fab-elementor`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M425.6 32H22.4C10 32 0 42 0 54.4v403.2C0 470 10 480 22.4 480h403.2c12.4 0 22.4-10 22.4-22.4V54.4C448 42 438 32 425.6 32M164.3 355.5h-39.8v-199h39.8v199zm159.3 0H204.1v-39.8h119.5v39.8zm0-79.6H204.1v-39.8h119.5v39.8zm0-79.7H204.1v-39.8h119.5v39.8z'/>
    </svg>
)

const FabElementor = createIcon(svgElement)

FabElementor.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabElementor
