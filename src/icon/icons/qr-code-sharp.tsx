/* eslint-disable */
import React from 'react'
import createIcon from '../base/createIcon'

const svgElement = (
    <svg viewBox='0 0 512 512'>
        <path d='M336 336H416V416H336z'/><path d='M272 272H336V336H272z'/><path d='M416 416H480V480H416z'/><path d='M432 272H480V320H432z'/><path d='M272 432H320V480H272z'/><path d='M336 96H416V176H336z'/><path d='M480 240H272V32h208zm-164-44h120V76H316z'/><path d='M96 96H176V176H96z'/><path d='M240 240H32V32h208zM76 196h120V76H76z'/><path d='M96 336H176V416H96z'/><path d='M240 480H32V272h208zM76 436h120V316H76z'/>
    </svg>
)

const QrCodeSharp = createIcon(svgElement)

QrCodeSharp.displayName = 'QrCodeSharp'

export { IconProps } from '../base/createIcon'

export default QrCodeSharp
