import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-location-arrow`
const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z'/>
    </svg>
)

const FasLocationArrow = createIcon(svgElement)

FasLocationArrow.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasLocationArrow
