import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon } from '../../../src'
import iconInfos from './icons.json'
import Clipboard from 'clipboard'

import './index.scss'

export interface IconWrapperProps {
  children: React.ReactNode
  name: string
}

const IconWrapper: React.FunctionComponent<IconWrapperProps> = props => {
  const { children, name } = props
  const [hover, setHover] = React.useState(false)
  const iconRef = React.useRef<HTMLDivElement>(null)

  const mouseEnter = () => setHover(true)
  const mouseLeave = () => setHover(false)

  const style = React.useMemo(() => {
    return { display: hover ? 'block' : 'none', opacity: hover ? 1 : 0 }
  }, [hover])

  React.useEffect(() => {
    const clipboard = new Clipboard(iconRef.current!)
    clipboard.on('success', () => {
      alert('复制成功')
      clipboard.destroy()
    })
    return () => {
      clipboard.destroy()
    }
  }, [])

  return (
    <div
      className='icon-wrapper'
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      ref={iconRef}
      data-clipboard-text={`<Icon.${name} />`}
    >
      <div className='icon'>{children}</div>
      <div className='icon-name' style={style}>
        {name}
      </div>
    </div>
  )
}

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
    const arr: Array<string> = []
    for (const name of iconNames) {
      const iconInfo = (iconInfos as any)[name] // eslint-disable-line @typescript-eslint/no-explicit-any
      if (!iconInfo) {
        // console.warn(`icon '${name}' is not in icon information file`)
        continue
      }
      const searchArr: Array<string> = iconInfo.search || []
      searchArr.push(name)
      const upSearch = search.toUpperCase()
      for (const item of searchArr) {
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
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
      <input onChange={searchClick} className='icon-input' placeholder='搜索图标' />
      <div className='icon-info'>点击下面图标可以直接复制组件代码</div>
      <div className='icon-list'>{iconNodes}</div>
    </div>
  )
}

IconSelect.displayName = 'icon-select'

export default IconSelect
