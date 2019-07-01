import * as React from 'react'
import { namePrefix } from '../../commons/config'
import createIcon from '../base/createIcon'

export const displayName = `${namePrefix}-fas-voicemail`
const svgElement = (
    <svg viewBox='0 0 640 512'>
        <path d='M496 128a144 144 0 0 0-119.74 224H263.74A144 144 0 1 0 144 416h352a144 144 0 0 0 0-288zM64 272a80 80 0 1 1 80 80 80 80 0 0 1-80-80zm432 80a80 80 0 1 1 80-80 80 80 0 0 1-80 80z'/>
    </svg>
)

const FasVoicemail = createIcon(svgElement)

FasVoicemail.displayName = displayName

export { IconProps } from '../base/createIcon'

export default FasVoicemail
