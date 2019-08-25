/* eslint-disable */
import React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-border-all`
const svgElement = (
    <svg viewBox='0 0 448 512'>
        <path d='M416 32H32A32 32 0 0 0 0 64v384a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32zm-32 64v128H256V96zm-192 0v128H64V96zM64 416V288h128v128zm192 0V288h128v128z'/>
    </svg>
)

const FasBorderAll = createIcon(svgElement)

FasBorderAll.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasBorderAll
