import * as React from 'react'
import BaseIcon, { IconProps } from './base-icon'

const createIcon = (svgElement: React.ReactElement<React.SVGProps<SVGSVGElement>>) => {
    const fn = (props: IconProps) => {
        return (
            <BaseIcon {...props}>{svgElement}</BaseIcon>
        )
    }
    return fn
}

export default createIcon
