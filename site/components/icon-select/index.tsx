import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon } from '../../../src'
import iconInfos from './icons.json'

import './index.scss'

export interface IconWrapperProps {
  children: React.ReactNode
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
    <div
      className='icon-wrapper'
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className='icon'>{children}</div>
      <div className='icon-name' style={style}>
        {name}
      </div>
    </div>
  )
}

IconWrapper.displayName = 'icon-wrapper'

IconWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

const iconNames = Object.keys(Icon).filter(it => it !== 'createIcon')

const IconSelect: React.FunctionComponent<{}> = () => {
  const [search, setSearch] = React.useState('')

  const icons = React.useMemo(() => {
    if (!search || search.trim() === '') {
      return iconNames
    }
    const arr: string[] = []
    for (const name of iconNames) {
      const iconInfo = (iconInfos as any)[name] // eslint-disable-line @typescript-eslint/no-explicit-any
      if (!iconInfo) {
        // console.warn(`icon '${name}' is not in icon information file`)
        continue
      }
      const searchArr: string[] = iconInfo.search || []
      searchArr.push(name)
      const upSearch = search.toUpperCase()
      for (const item of searchArr) {
        if (item.toUpperCase().match(upSearch)) {
          arr.push(name)
          break
        }
      }
    }
    return arr
  }, [search])

  const iconNodes = React.useMemo(() => {
    const arr = []
    for (const name of icons) {
      const Item = Icon[name as keyof typeof Icon] as any // eslint-disable-line @typescript-eslint/no-explicit-any
      arr.push(
        <IconWrapper name={name} key={name}>
          <Item size={40} />
        </IconWrapper>
      )
    }
    return arr
  }, [icons])

  const searchClick: React.ChangeEventHandler<HTMLInputElement> = e => {
    const content = e.target.value
    setSearch(() => content)
  }

  return (
    <div className='icon-select'>
      <input onChange={searchClick} className='icon-input' />
      {iconNodes}
    </div>
  )
}

IconSelect.displayName = 'icon-select'

export default IconSelect
