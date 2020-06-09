/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512' fill='currentColor' stroke='currentColor'>
        <path fill='none' d='M337.46 240L312 214.54 256 270.54 200 214.54 174.54 240 230.54 296 174.54 352 200 377.46 256 321.46 312 377.46 337.46 352 281.46 296 337.46 240z'/><path fill='none' d='M337.46 240L312 214.54 256 270.54 200 214.54 174.54 240 230.54 296 174.54 352 200 377.46 256 321.46 312 377.46 337.46 352 281.46 296 337.46 240z'/><path d='M64 160l29.74 282.51A24 24 0 00117.61 464h276.78a24 24 0 0023.87-21.49L448 160zm248 217.46l-56-56-56 56L174.54 352l56-56-56-56L200 214.54l56 56 56-56L337.46 240l-56 56 56 56z'/><rect width='448' height='80' x='32' y='48' rx='12' ry='12'/>
    </svg>
)

const TrashBinSharp = createIcon(svgElement)

TrashBinSharp.displayName = 'TrashBinSharp'

export { IconProps } from '../base/createIcon'

export default TrashBinSharp
