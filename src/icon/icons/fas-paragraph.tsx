import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

const displayName = `${namePrefix}-fas-paragraph`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M408 32H177.531C88.948 32 16.045 103.335 16 191.918 15.956 280.321 87.607 352 176 352v104c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V112h32v344c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V112h40c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24z'/>
    </svg>
)

const FasParagraph = createIcon(svgElement)

FasParagraph.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasParagraph
