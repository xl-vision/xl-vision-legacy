import React, { TouchEvent, MouseEvent } from 'react'
import TransitionGroup, { TransitionGroupClasses } from '../TransitionGroup'
import ConfigContext from '../ConfigProvider/ConfigContext'
import useConstantCallback from '../commons/hooks/useConstantCallback'

export interface RippleProps {
  transitionClasses?: TransitionGroupClasses
  clsPrefix?: string
  leaveAfterEnter?: boolean
}

const Ripple: React.FunctionComponent<RippleProps> = (props) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)
  const { clsPrefix = `${rootClsPrefix}-ripple`, transitionClasses, leaveAfterEnter } = props

  const [ripples, setRipples] = React.useState<Array<React.ReactElement>>([])
  const finishedCountRef = React.useRef(0)
  const waitFinishedCountRef = React.useRef(0)
  const keyRef = React.useRef(0)
  const ignoreMouseDonwRef = React.useRef(false)

  const startCommit = React.useCallback(
    ({ x, y, size }: { x: number; y: number; size: number }) => {
      const key = keyRef.current
      const styles: React.CSSProperties = {
        width: size,
        height: size,
        top: -size / 2 + y,
        left: -size / 2 + x
      }
      const ripple = <div className={`${clsPrefix}__inner`} key={key} style={styles}></div>
      setRipples((prev) => [...prev, ripple])
      keyRef.current++
    },
    [clsPrefix]
  )

  const start = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (e.type === 'mousedown' && ignoreMouseDonwRef.current) {
        ignoreMouseDonwRef.current = false
        return
      }

      if (e.type === 'touchstart') {
        ignoreMouseDonwRef.current = true
      }
      const el = e.currentTarget as HTMLElement
      const rect = el.getBoundingClientRect()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { clientX, clientY } = (e as any).touches
        ? (e as TouchEvent).touches[0]
        : (e as MouseEvent)
      const x = Math.round(clientX - rect.left)
      const y = Math.round(clientY - rect.top)
      const sizeX = Math.max(Math.abs(el.clientWidth - x), x) * 2 + 2
      const sizeY = Math.max(Math.abs(el.clientHeight - y), y) * 2 + 2
      const size = Math.sqrt(sizeX ** 2 + sizeY ** 2)
      startCommit({ x, y, size })
    },
    [startCommit]
  )

  const stop = useConstantCallback(() => {
    if (leaveAfterEnter) {
      if (finishedCountRef.current > 0) {
        setRipples((prev) => prev.slice(1))
        finishedCountRef.current--
        return
      }

      // 当多次触发stop，需要判断是否触发次数过多
      if (ripples.length > 0) {
        waitFinishedCountRef.current++
      }
    } else {
      setRipples((prev) => {
        if (prev.length > 0) {
          return prev.slice(1)
        }
        return prev
      })
    }
  })

  const afterEnter = useConstantCallback(() => {
    if (leaveAfterEnter) {
      if (waitFinishedCountRef.current > 0) {
        setRipples((prev) => prev.slice(1))
        waitFinishedCountRef.current--
        return
      }
      finishedCountRef.current++
    }
  })

  return (
    <div
      className={`${clsPrefix}`}
      onMouseDown={start}
      onTouchStart={start}
      onMouseUp={stop}
      onTouchEnd={stop}
      onMouseLeave={stop}
      onTouchMove={stop}
    >
      <TransitionGroup transitionClasses={transitionClasses} afterEnter={afterEnter}>
        {ripples}
      </TransitionGroup>
    </div>
  )
}

export default Ripple
