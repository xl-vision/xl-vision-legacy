import * as React from 'react'
import Clipboard from 'clipboard'
import Icons, { IconProps } from '../../../src/icon'
import data from './data.json'

import classes from './index.module.scss'

export interface IconWrapperProps {
  children: React.ReactNode
  name: string
}

const IconWrapper: React.FunctionComponent<IconWrapperProps> = (props) => {
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
      className={classes.iconWrapper}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      ref={iconRef}
      data-clipboard-text={`<Icon.${name} />`}
    >
      <div className={classes.icon}>{children}</div>
      <div className={classes.name} style={style}>
        {name}
      </div>
    </div>
  )
}

const iconNames = Object.keys(data) as Array<keyof typeof data>

const IconSelect: React.FunctionComponent<{}> = () => {
  const [search, setSearch] = React.useState('')

  const icons = React.useMemo(() => {
    const text = (search || '').trim()
    if (!text) {
      return iconNames
    }

    const keys = text.split(/\s+/).map((it) => it.toLowerCase())

    const arr: Array<string> = []

    for (const name of iconNames) {
      const tags = data[name]
      const flag = keys.every((it) => {
        for (const tag of tags) {
          if (tag.includes(it)) {
            return true
          }
        }
        return false
      })
      if (flag) {
        arr.push(name)
      }
    }

    return arr
  }, [search])

  const iconNodes = React.useMemo(() => {
    const arr = []
    for (const name of icons) {
      const Icon = Icons[name as keyof typeof Icons] as React.FunctionComponent<IconProps>
      if (!Icon) {
        continue
      }
      arr.push(
        <IconWrapper name={name} key={name}>
          <Icon size={40} />
        </IconWrapper>
      )
    }
    return arr
  }, [icons])

  const searchClick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const content = e.target.value
    setSearch(() => content)
  }

  return (
    <div className={classes.iconSelect}>
      <input onChange={searchClick} className={classes.input} placeholder='搜索图标' />
      <div className={classes.info}>点击下面图标可以直接复制组件代码</div>
      <div className={classes.list}>{iconNodes}</div>
    </div>
  )
}

IconSelect.displayName = 'icon-select'

export default IconSelect
