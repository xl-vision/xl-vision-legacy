/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M392 440V320h40v160H64V320h40v120z'/><path d='M149.1 308.77l198.57 40.87 8.4-39.32-198.57-40.87zm26.27-93.12L359.22 300 376 263.76l-183.82-84.84zm50.95-89l156 127.78 25.74-30.52-156-127.78zM328 32l-33.39 23.8 120.82 160.37L448 192zM144 400h204v-40H144z'/>
    </svg>
)

const LogoStackoverflow = createIcon(svgElement)

LogoStackoverflow.displayName = 'LogoStackoverflow'

export { IconProps } from '../base/createIcon'

export default LogoStackoverflow