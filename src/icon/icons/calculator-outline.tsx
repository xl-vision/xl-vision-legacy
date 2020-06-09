/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <rect width='288' height='416' x='112' y='48' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' rx='32' ry='32'/><path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M160.01 112H352V176H160.01z'/><circle cx='168' cy='248' r='24'/><circle cx='256' cy='248' r='24'/><circle cx='344' cy='248' r='24'/><circle cx='168' cy='328' r='24'/><circle cx='256' cy='328' r='24'/><circle cx='168' cy='408' r='24'/><circle cx='256' cy='408' r='24'/><rect width='48' height='128' x='320' y='304' rx='24' ry='24'/>
    </svg>
)

const CalculatorOutline = createIcon(svgElement)

CalculatorOutline.displayName = 'CalculatorOutline'

export { IconProps } from '../base/createIcon'

export default CalculatorOutline
