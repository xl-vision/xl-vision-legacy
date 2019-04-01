import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-arrow-down`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z'/>
    </svg>
)

const FasArrowDown = createIcon(svgElement)

FasArrowDown.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasArrowDown
