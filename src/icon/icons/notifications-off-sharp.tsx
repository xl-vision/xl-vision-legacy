/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M240 -31.53H272V543.53H240z' transform='rotate(-45 256 256.002)'/><path d='M256 480a80.09 80.09 0 0073.3-48H182.7a80.09 80.09 0 0073.3 48zM112 227.47V288l-48 64v48h268.12L115.87 183.75a236.75 236.75 0 00-3.87 43.72zM448 352l-48-64v-60.53C400 157 372.64 95.61 304 80l-8-48h-80l-8 48a117.45 117.45 0 00-41.95 18.17l282 282z'/>
    </svg>
)

const NotificationsOffSharp = createIcon(svgElement)

NotificationsOffSharp.displayName = 'NotificationsOffSharp'

export { IconProps } from '../base/createIcon'

export default NotificationsOffSharp
