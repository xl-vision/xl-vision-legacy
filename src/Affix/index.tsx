import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ConfigContext from '../ConfigProvider/ConfigContext'
import useEventCallback from '../commons/hooks/useEventCallback'
import { on, off } from '../commons/utils/event'
import { throttleByAnimationFrame } from '../commons/utils/function'

export interface AffixProps {
  clsPrefix?: string
  children: React.ReactNode
  offsetTop?: number
  offsetBottom?: number
  getTarget?: () => HTMLElement | Document | Window
  onChange?: (changed: boolean) => void
}

export interface AffixRef {
  updatePosition: () => void
}

const defaultGetTarget = () => window

const Affix = React.forwardRef<AffixRef, AffixProps>((props, ref) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)

  const {
    clsPrefix = `${rootClsPrefix}-affix`,
    children,
    offsetBottom,
    offsetTop,
    getTarget = defaultGetTarget,
    onChange
  } = props

  const containerNodeRef = React.useRef<HTMLDivElement>(null)
  const fixedNodeRef = React.useRef<HTMLDivElement>(null)

  const [affixState, setAffixState] = React.useState<{
    placeholder?: React.CSSProperties
    fixed?: React.CSSProperties
  }>({})

  const measure = useEventCallback(() => {
    const containerNode = containerNodeRef.current

    const target = getTarget()

    if (!containerNode || !target) {
      return
    }

    const containerNodeRect = getTargetRect(containerNode)
    const targetNodeRect = getTargetRect(target)

    const isAffix = affixState.placeholder

    if (offsetTop !== undefined && containerNodeRect.top - targetNodeRect.top < offsetTop) {
      setAffixState({
        fixed: {
          position: 'fixed',
          top: offsetTop + targetNodeRect.top,
          width: containerNodeRect.width,
          height: containerNodeRect.height
        },
        placeholder: {
          width: containerNodeRect.width,
          height: containerNodeRect.height
        }
      })
      if (!isAffix) {
        onChange && onChange(true)
      }
      return
    }
    if (
      offsetBottom !== undefined &&
      targetNodeRect.bottom - containerNodeRect.bottom < offsetBottom
    ) {
      setAffixState({
        fixed: {
          position: 'fixed',
          bottom: offsetBottom + window.innerHeight - targetNodeRect.bottom,
          width: containerNodeRect.width,
          height: containerNodeRect.height
        },
        placeholder: {
          width: containerNodeRect.width,
          height: containerNodeRect.height
        }
      })
      if (!isAffix) {
        onChange && onChange(true)
      }
      return
    }
    if (isAffix) {
      onChange && onChange(false)
      setAffixState({})
    }
  })

  const updatePosition = React.useMemo(() => throttleByAnimationFrame(measure), [measure])

  React.useImperativeHandle(ref, () => ({
    updatePosition
  }))

  React.useEffect(() => {
    const target = getTarget()
    if (!target) {
      return
    }
    on(target, 'scroll', updatePosition)
    on(target, 'resize', updatePosition)

    updatePosition()

    return () => {
      off(target, 'scroll', updatePosition)
      off(target, 'resize', updatePosition)
    }
  }, [getTarget, updatePosition])

  const placeholderStyle = affixState.placeholder

  const fixedClasses = classnames({
    [clsPrefix]: placeholderStyle
  })

  return (
    <div ref={containerNodeRef}>
      {placeholderStyle && <div style={placeholderStyle} aria-hidden={true} />}
      <div className={fixedClasses} ref={fixedNodeRef} style={affixState.fixed}>
        {children}
      </div>
    </div>
  )
})

Affix.propTypes = {
  children: PropTypes.element.isRequired,
  clsPrefix: PropTypes.string,
  offsetBottom: PropTypes.number,
  offsetTop: PropTypes.number,
  getTarget: PropTypes.func,
  onChange: PropTypes.func
}

export default Affix

const getTargetRect = (target: HTMLElement | Document | Window) => {
  if (target === window) {
    return {
      top: 0,
      bottom: window.innerHeight
    } as DOMRect
  }
  if (target instanceof Document) {
    return target.documentElement.getBoundingClientRect()
  }

  return (target as HTMLElement).getBoundingClientRect()
}
