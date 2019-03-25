import * as React from 'react'
import { Icon } from 'xl-vision'
import './index.scss'

export interface IconWrapperProps {
    children: React.ReactNode,
    name: string
}

const IconWrapper: React.FunctionComponent<IconWrapperProps> = props => {
    const { children, name } = props
    const [hover, setHover] = React.useState(false)

    const mouseEnter = () => setHover(true)
    const mouseLeave = () => setHover(false)

    const style = React.useMemo(() => {
        return { display: hover ? 'block' : 'none', opacity: hover ? 1 : 0 }
    }, [hover])

    return (
        <div className='icon-wrapper' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className='icon'>{children}</div>
            <div className='icon-name' style={style}>{name}</div>
        </div>
    )

}

const IconSelect: React.FunctionComponent<{}> = () => {

    const arr = []

    for (const name of Object.keys(Icon)) {
        if (name === 'createIcon') {
            continue
        }
        const Item = Icon[name]
        arr.push(<IconWrapper name={name} children={<Item size={40}/>} key={name} />)
    }

    return (
        <div className='icon-select'>
            {arr}
        </div>
    )
}

export default IconSelect
