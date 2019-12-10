import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import useOnMouseDrag, { DragPosition } from '../commons/hooks/useOnMouseDrag'
import useOnTouchDrag from '../commons/hooks/useOnTouchDrag'
import useUpdate from '../commons/hooks/useUpdate'
import { off, on } from '../commons/utils/event'
import { nextFrame } from '../commons/utils/transition'
import CssTransition from '../css-transition'
import { FasAngleDown, FasAngleLeft, FasAngleRight, FasAngleUp } from '../icon'

export interface CarouselProps {
  arrow?: 'hover' | 'always' | 'none'
  autoPlay?: boolean
  autoPlayDuration?: number
  children: React.ReactElement | React.ReactElement[]
  circleDot?: boolean
  damping?: number
  defaultIndex?: number
  direction?: 'horizontal' | 'vertical'
  dotRender?: (index: number, activeIndex: number) => React.ReactNode
  dots?: boolean
  dotTrigger?: 'click' | 'hover'
  height?: number | string
  loop?: boolean
  onChange?: (current: number) => void
  prefixCls?: string
  slide?: boolean
  width?: number | string
}

const Carousel: React.FunctionComponent<CarouselProps> = props => {
  const {
    damping = 35,
    children,
    height = '100%',
    width = '100%',
    // 防止每次调用都创建
    onChange,
    arrow = 'hover',
    autoPlay = false,
    autoPlayDuration = 3000,
    circleDot = false,
    defaultIndex = 0,
    direction = 'horizontal',
    dotTrigger = 'click',
    dots = true,
    loop = true,
    prefixCls = `${namePrefix}-carousel`,
    slide = true,
    ...others
  } = props

  const dotRenderFn = React.useCallback(
    (index: number, current: number) => (
      <button
        className={classnames(`${prefixCls}__dot-inner`, {
          [`${prefixCls}__dot-inner--circle`]: circleDot,
          [`${prefixCls}__dot-inner--active`]: index === current
        })}
      >
        {index}
      </button>
    ),
    [prefixCls, circleDot]
  )

  // 阻止每次调用都创建新的函数
  const dotRender = others.dotRender || dotRenderFn

  delete others.dotRender

  // 默认展示第一页
  const [activeIndex, setActiveIndex] = React.useState(defaultIndex + 1)
  // 幻灯片页尺寸
  const [size, setSize] = React.useState(0)
  const [hover, setHover] = React.useState(false)
  const [drag, setDrag] = React.useState(false)
  const [isAnimate, setAnimate] = React.useState(false)
  // 滑动的距离
  const [distance, setDistance] = React.useState(0)

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const carouselRef = React.useRef<HTMLDivElement>(null)

  // 记录拖拽开始时间
  const startTimeRef = React.useRef(0)

  // 转成数组
  const childrenArray = React.useMemo(() => {
    return React.Children.map<React.ReactElement, React.ReactElement>(children, it => it)
  }, [children])

  // 包装，处理特殊情况
  const setActiveIndexWrap = React.useCallback(
    (cb: ((last: number) => number) | number) => {
      let call: (last: number) => number
      if (typeof cb === 'function') {
        call = cb
      } else {
        call = () => cb
      }
      setActiveIndex(prev => {
        if (prev === 0 || prev === childrenArray.length + 1) {
          const index = prev === 0 ? childrenArray.length : 1
          // 获取之前的动画
          setAnimate(() => {
            nextFrame(() => {
              // 开启动画
              setAnimate(true)
              setActiveIndex(call(index))
            })
            // 先关闭动画
            return false
          })

          return index
        }
        return call(prev)
      })
    },
    [childrenArray]
  )

  const toPrev = React.useCallback(() => {
    setAnimate(true)
    setActiveIndexWrap(prev => {
      if (!loop && prev === 1) {
        return childrenArray.length
      }
      return prev - 1
    })
  }, [setActiveIndexWrap, loop, childrenArray])

  const toNext = React.useCallback(() => {
    setAnimate(true)
    setActiveIndexWrap(prev => {
      if (!loop && prev === childrenArray.length) {
        return 1
      }
      return prev + 1
    })
  }, [setActiveIndexWrap, loop, childrenArray])

  // 滑动处理函数
  const onDragHandler = React.useCallback(
    (start: DragPosition, _end: DragPosition, isEnd: boolean) => {
      if (!slide) {
        return
      }
      // 单个幻灯片不允许移动
      if (childrenArray.length <= 1) {
        return
      }

      if (!startTimeRef.current) {
        setDrag(true)
        startTimeRef.current = Date.now()
        setAnimate(false)
        // 处理边界
        setActiveIndexWrap(prev => prev)
      }
      // 向左滑动实际是向右切换
      const _distance = direction === 'horizontal' ? start.x - _end.x : start.y - _end.y
      // 滑动时保持和鼠标一致，不需要动画
      setDistance(_distance)

      if (isEnd) {
        // 恢复动画
        setAnimate(true)

        const endTime = Date.now()
        const startTime = startTimeRef.current
        if (_distance === 0) {
          return
        }

        let abs = Math.abs(_distance)
        // 滑动速度
        const speed = (abs * 1000) / (endTime - startTime)
        // 还可以滑动的距离
        // 0.5*v^2/a
        const lastDist = (speed * speed) / (2 * damping)
        // 预计总共滑动距离
        abs += lastDist

        // 判断是否滑动到下一页
        if (abs >= size) {
          setActiveIndexWrap(prev => {
            if (_distance > 0) {
              if (!loop && prev === childrenArray.length) {
                return prev
              } else {
                return prev + 1
              }
            } else {
              if (!loop && prev === 1) {
                return prev
              } else {
                return prev - 1
              }
            }
          })
        }

        setDistance(0)

        // 释放
        startTimeRef.current = 0
        setDrag(false)
      }
    },
    [direction, size, childrenArray, damping, slide, startTimeRef, loop, setActiveIndexWrap]
  )

  // 绑定滑动事件
  useOnMouseDrag(carouselRef, onDragHandler, false)
  useOnTouchDrag(carouselRef, onDragHandler, false)

  const calculateSize = React.useCallback(() => {
    const el = wrapperRef.current
    if (!el) {
      return 0
    }
    if (direction === 'vertical') {
      return el.offsetHeight
    }
    return el.offsetWidth
  }, [wrapperRef, direction])

  // 理论当前显示的幻灯片索引
  const currentIndex = React.useMemo(() => {
    if (activeIndex === 0) {
      return childrenArray.length - 1
    } else if (activeIndex === childrenArray.length + 1) {
      return 0
    }
    return activeIndex - 1
  }, [activeIndex, childrenArray])

  // 回调
  useUpdate(() => {
    onChange && onChange(currentIndex)
  }, [currentIndex])

  React.useEffect(() => {
    const handler = () => {
      // 延迟计算,确保页面页面加载好后再计算，否则可能计算不准确
      nextFrame(() => {
        setSize(calculateSize())
      })
    }
    handler()
    on('resize', handler)
    return () => off('resize', handler)
  }, [calculateSize])

  // 自动播放
  React.useEffect(() => {
    if (hover || drag || !autoPlay) {
      return
    }

    if (childrenArray.length <= 1) {
      return
    }

    const id = setInterval(toNext, autoPlayDuration)
    return () => {
      clearInterval(id)
    }
  }, [autoPlay, hover, autoPlayDuration, toNext, drag, childrenArray])

  const onMouseEnter = React.useCallback(() => {
    setHover(true)
  }, [])

  const onMouseLeave = React.useCallback(() => {
    setHover(false)
  }, [])

  const childrenContainer = React.useMemo(() => {
    const wrap = (node: React.ReactElement, index: number) => {
      const childClasses = classnames(`${prefixCls}__item`)
      const childStyle: React.CSSProperties = {
        [direction === 'vertical' ? 'height' : 'width']: size
      }
      return (
        <div className={childClasses} style={childStyle} key={index}>
          {node}
        </div>
      )
    }
    const list: React.ReactElement[] = []

    list.push(wrap(childrenArray[childrenArray.length - 1], -1))
    for (let i = 0; i < childrenArray.length; i++) {
      list.push(wrap(childrenArray[i], i))
    }
    list.push(wrap(childrenArray[0], -2))
    return list
  }, [childrenArray, size, direction, prefixCls])

  const dotsNode = dots && (
    <ul className={`${prefixCls}__dots`}>
      {childrenArray.map((_item, index) => {
        const _classes = classnames(`${prefixCls}__dot`)
        const onDotClick = () => {
          if (dotTrigger === 'click') {
            setAnimate(true)
            setActiveIndexWrap(index + 1)
          }
        }
        const onDotMouseEnter = () => {
          if (dotTrigger === 'hover') {
            setAnimate(true)
            setActiveIndexWrap(index + 1)
          }
        }
        return (
          <li key={index} className={_classes} onClick={onDotClick} onMouseEnter={onDotMouseEnter}>
            {dotRender(index, currentIndex)}
          </li>
        )
      })}
    </ul>
  )

  const listClasses = classnames(`${prefixCls}__items`, {
    [`${prefixCls}__items--animate`]: isAnimate
  })

  const listStyle = (() => {
    const totalSize = (childrenArray.length + 2) * size
    const style: React.CSSProperties = {
      [direction === 'vertical' ? 'height' : 'width']: totalSize
    }

    let _distance = distance
    // 拖拽不允许超出最后一张幻灯片和第一张幻灯片
    if (!loop) {
      if (
        (activeIndex >= childrenArray.length && _distance > 0) ||
        (activeIndex <= 1 && _distance < 0)
      ) {
        _distance = 0
      }
    }
    _distance += size * activeIndex

    if (direction === 'vertical') {
      style.transform = `translate3d(0, -${_distance}px, 0)`
    } else {
      style.transform = `translate3d(-${_distance}px, 0, 0)`
    }
    return style
  })()

  const arrowNode = (
    <>
      <CssTransition
        forceRender={true}
        show={
          ((loop && childrenArray.length > 1) || currentIndex > 0) &&
          (arrow === 'always' || (arrow === 'hover' && hover))
        }
        classNames={`${prefixCls}__arrow--fade`}
      >
        <button className={`${prefixCls}__arrow ${prefixCls}__arrow--first`} onClick={toPrev}>
          {direction === 'vertical' ? <FasAngleUp /> : <FasAngleLeft />}
        </button>
      </CssTransition>
      <CssTransition
        forceRender={true}
        show={
          ((loop && childrenArray.length > 1) || currentIndex < childrenArray.length - 1) &&
          (arrow === 'always' || (arrow === 'hover' && hover))
        }
        classNames={`${prefixCls}__arrow--fade`}
      >
        <button className={`${prefixCls}__arrow ${prefixCls}__arrow--last`} onClick={toNext}>
          {direction === 'vertical' ? <FasAngleDown /> : <FasAngleRight />}
        </button>
      </CssTransition>
    </>
  )

  const classes = classnames(prefixCls, `${prefixCls}--${direction}`)

  return (
    <div
      ref={carouselRef}
      className={classes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ height, width }}
    >
      <div className={`${prefixCls}__wrap`} ref={wrapperRef}>
        <div className={listClasses} style={listStyle}>
          {childrenContainer}
        </div>
      </div>
      {arrowNode}
      {dotsNode}
    </div>
  )
}

const checkDamping: PropTypes.Validator<number> = (
  props: {
    [key: string]: number | object
  },
  propName
) => {
  const val = props[propName]
  if (val !== undefined) {
    if (typeof val === 'number') {
      if (val <= 0) {
        return new Error(`${propName} should be over 0`)
      }
    } else {
      return new Error(`${propName} should be number`)
    }
  }
  return null
}

Carousel.propTypes = {
  arrow: PropTypes.oneOf(['hover', 'always', 'none']),
  autoPlay: PropTypes.bool,
  autoPlayDuration: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired)
  ]).isRequired,
  circleDot: PropTypes.bool,
  damping: checkDamping,
  defaultIndex: PropTypes.number,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  dotRender: PropTypes.func,
  dotTrigger: PropTypes.oneOf(['hover', 'click']),
  dots: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loop: PropTypes.bool,
  onChange: PropTypes.func,
  prefixCls: PropTypes.string,
  slide: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Carousel
