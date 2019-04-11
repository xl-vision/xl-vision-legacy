import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fab-yandex`
const svgElement = (
    <svg viewBox='0 0 256 512'>
        <path d='M153.1 315.8L65.7 512H2l96-209.8c-45.1-22.9-75.2-64.4-75.2-141.1C22.7 53.7 90.8 0 171.7 0H254v512h-55.1V315.8h-45.8zm45.8-269.3h-29.4c-44.4 0-87.4 29.4-87.4 114.6 0 82.3 39.4 108.8 87.4 108.8h29.4V46.5z'/>
    </svg>
)

const FabYandex = createIcon(svgElement)

FabYandex.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabYandex