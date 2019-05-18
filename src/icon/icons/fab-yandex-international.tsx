import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fab-yandex-international`
const svgElement = (
    <svg viewBox='0 0 320 512'>
        <path d='M129.5 512V345.9L18.5 48h55.8l81.8 229.7L250.2 0h51.3L180.8 347.8V512h-51.3z'/>
    </svg>
)

const FabYandexInternational = createIcon(svgElement)

FabYandexInternational.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FabYandexInternational
