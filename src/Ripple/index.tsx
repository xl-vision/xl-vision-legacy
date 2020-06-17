import React, { TouchEvent, MouseEvent } from 'react'
import TransitionGroup, { TransitionGroupClasses } from '../TransitionGroup'

export interface RippleProps {
  transitionClasses?: TransitionGroupClasses
  rippleClass?: string
  rippleInnerClass?: string
}

const Ripple: React.FunctionComponent<RippleProps> = (props) => {
  const { rippleClass, rippleInnerClass, transitionClasses } = props

  const [ripples, setRipples] = React.useState<Array<React.ReactElement>>([])
  const finishedRipplesRef = React.useRef<Array<string>>([])
  const waitFinishedRipplesRef = React.useRef<Array<string>>([])
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
      const ripple = (
        <div data-key={key} className={rippleInnerClass} key={key} style={styles}></div>
      )
      setRipples((prev) => [...prev, ripple])
      keyRef.current++
    },
    [rippleInnerClass]
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
      const el = e.target as HTMLElement
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

  const stop = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      const key = (e.target as HTMLElement).dataset.key!
      if (finishedRipplesRef.current.includes(key)) {
        setRipples((prev) => prev.filter((it) => it.key !== key))
        finishedRipplesRef.current = finishedRipplesRef.current.filter((it) => it !== key)
        return
      }
      console.log(e.target)
      console.log(key)
      waitFinishedRipplesRef.current.push(key)
    },
    []
  )

  const afterEnter = React.useCallback((e: HTMLElement) => {
    const key = e.dataset.key!
    if (waitFinishedRipplesRef.current.includes(key)) {
      setRipples((prev) => prev.filter((it) => it.key !== key))
      waitFinishedRipplesRef.current = waitFinishedRipplesRef.current.filter((it) => it !== key)
      return
    }
    finishedRipplesRef.current.push(key)
  }, [])

  return (
    <div
      className={rippleClass}
      onMouseDown={start}
      onTouchStart={start}
      onMouseUp={stop}
      onTouchEnd={stop}
    >
      <TransitionGroup transitionClasses={transitionClasses} afterEnter={afterEnter}>
        {ripples}
      </TransitionGroup>
    </div>
  )
}

export default Ripple
