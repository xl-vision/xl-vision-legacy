/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M84 480H28a12 12 0 01-12-12V92a12 12 0 0112-12h56a12 12 0 0112 12v376a12 12 0 01-12 12zM240 208v-52a12 12 0 00-12-12H124a12 12 0 00-12 12v52zM112 416v52a12 12 0 0012 12h104a12 12 0 0012-12v-52z'/><path d='M112 240H240V384H112z'/><path d='M340 480h-72a12 12 0 01-12-12V44a12 12 0 0112-12h72a12 12 0 0112 12v424a12 12 0 01-12 12zM369 100.7l30 367.83a12 12 0 0013.45 10.92l72.16-9a12 12 0 0010.47-12.9L465 91.21a12 12 0 00-13.2-10.94l-72.13 7.51A12 12 0 00369 100.7z'/>
    </svg>
)

const LibrarySharp = createIcon(svgElement)

LibrarySharp.displayName = 'LibrarySharp'

export { IconProps } from '../base/createIcon'

export default LibrarySharp