/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M386.24 121.68a11 11 0 00-18.57-6L80 400l159.34 91.81a33.32 33.32 0 0032.4 0L432 400zM221.32 136.68v-.05l-103 192.07a4 4 0 006.34 4.74L256.61 203l.5-.5zM207.19 129.06l5-9.39L160 21.92c-5.05-9.47-17.9-7.06-19.56 3.54L89.09 343.7a1.33 1.33 0 002.49.84zM235.37 129L269 190.77l32.47-32.09L265.26 90c-4.19-8-14.38-8.79-18.53-.81l-16.39 30.63 5 9.14z'/>
    </svg>
)

const LogoFirebase = createIcon(svgElement)

LogoFirebase.displayName = 'LogoFirebase'

export { IconProps } from '../base/createIcon'

export default LogoFirebase
