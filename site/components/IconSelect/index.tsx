import * as React from 'react'
import Clipboard from 'clipboard'
import * as Icons from '../../../src/icon'
import data from './data.json'

import classes from './index.module.scss'
import { Button } from '../../../src'

export interface IconWrapperProps {
  children: React.ReactNode
  name: string
}

const IconWrapper: React.FunctionComponent<IconWrapperProps> = (props) => {
  // eslint-disable-next-line react/prop-types
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
      // eslint-disable-next-line no-alert
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

const IconSelect: React.FunctionComponent<void> = () => {
  const [search, setSearch] = React.useState('')

  const [type, setType] = React.useState('fill')

  const icons = React.useMemo(() => {
    const iconNames = (Object.keys(data) as Array<keyof typeof data>).filter((it) => {
      if (type === 'outline') {
        return it.endsWith('Outline')
      }
      if (type === 'sharp') {
        return it.endsWith('Sharp')
      }
      return !it.endsWith('Outline') && !it.endsWith('Sharp')
    })
    const text = (search || '').trim()

    if (!text) {
      return iconNames
    }

    const keys = text.split(/\s+/).map((it) => it.toLowerCase())

    const arr: Array<string> = []

    iconNames.forEach((name) => {
      const tags = data[name]
      const flag = keys.every((it) => {
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i]
          if (tag.includes(it)) {
            return true
          }
        }
        return false
      })
      if (flag) {
        arr.push(name)
      }
    })

    return arr
  }, [search, type])

  const iconNodes = React.useMemo(() => {
    const arr: Array<React.ReactElement> = []
    icons.forEach((name) => {
      const Icon = Icons[name as keyof typeof Icons] as React.FunctionComponent<Icons.IconProps>
      if (Icon) {
        arr.push(
          <IconWrapper name={name} key={name}>
            <Icon size={40} />
          </IconWrapper>
        )
      }
    })
    return arr
  }, [icons])

  const searchClick: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
    const content = e.target.value
    setSearch(() => content)
  }, [])

  const fillClick = React.useCallback(() => {
    setType('fill')
  }, [])
  const outlineClick = React.useCallback(() => {
    setType('outline')
  }, [])
  const sharpClick = React.useCallback(() => {
    setType('sharp')
  }, [])
  return (
    <div className={classes.iconSelect}>
      <input onChange={searchClick} className={classes.input} placeholder='搜索图标' />
      <Button.Group theme='primary' className={classes.buttonGroup}>
        <Button type='button' disabled={type === 'fill'} onClick={fillClick}>
          fill
        </Button>
        <Button type='button' disabled={type === 'outline'} onClick={outlineClick}>
          outline
        </Button>
        <Button type='button' disabled={type === 'sharp'} onClick={sharpClick}>
          sharp
        </Button>
      </Button.Group>
      <div className={classes.info}>点击下面图标可以直接复制组件代码</div>
      <div className={classes.list}>{iconNodes}</div>
    </div>
  )
}

export default IconSelect
