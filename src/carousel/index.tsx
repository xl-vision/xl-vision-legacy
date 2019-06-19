import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import useDrag, { DragPosition } from '../commons/hooks/useDrag'
import useUpdate from '../commons/hooks/useUpdate'
import { off, on } from '../commons/utils/event'
import CssTransition from '../css-transition'
import FasAngleDown from '../icon/icons/fas-angle-down'
import FasAngleLeft from '../icon/icons/fas-angle-left'
import FasAngleRight from '../icon/icons/fas-angle-right'
import FasAngleUp from '../icon/icons/fas-angle-up'

export interface CarouselProps {
  arrow?: 'hover' | 'always' | 'none'
  autoPlay?: boolean
  autoPlayDuration?: number
  children: React.ReactElement | React.ReactElement[]
  circleDot?: boolean
  defaultIndex?: number
  direction?: 'horizontal' | 'vertical'
  dotRender?: (index: number, activeIndex: number) => React.ReactNode
  dots?: boolean
  dotTrigger?: 'click' | 'hover'
  height?: number | string
  loop?: boolean
  moveRatio: number
  moveThreshold?: number
  onChange?: (current: number) => void
  prefixCls?: string
  width?: number | string
}

export const displayName = `${namePrefix}-carousel`

const Carousel: React.FunctionComponent<CarouselProps> = props => {
  const {
    moveRatio = 1,
    moveThreshold = 0.2,
    children,
    height = 'auto',
    width = '100%',
    // tslint:disable-next-line: no-empty
    onChange = () => {},
    arrow = 'hover',
    autoPlay = false,
    autoPlayDuration = 3000,
    circleDot = false,
    defaultIndex = 0,
    direction = 'horizontal',
    dotTrigger = 'click',
    dotRender = ((index: number, current: number) => (
        <button
            className={classnames(`${prefixCls}__dot-inner`, {
              [`${prefixCls}__dot-inner--circle`]: circleDot,
              [`${prefixCls}__dot-inner--active`]: index === current
            })}
        >
            {index}
        </button>
    )),
    dots = true,
    loop = true,
    prefixCls = displayName
  } = props

  const [activeIndex, setActiveIndex] = React.useState(defaultIndex + 1)
  const [tempIndex, setTempIndex] = React.useState()
  const [size, setSize] = React.useState(0)
  const [hover, setHover] = React.useState(false)
  const [drag, setDrag] = React.useState(false)
  const [isAnimate, setAnimate] = React.useState(false)

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const [distance, setDistance] = React.useState(0)

  // 转成数组
  const childrenArray = React.useMemo(() => {
    return React.Children.map<React.ReactElement, React.ReactElement>(
      children,
      it => it
    )
  }, [children])

  const calculateSize = React.useCallback(() => {
    const ele = wrapperRef.current
    if (!ele) {
      return 0
    }
    if (direction === 'vertical') {
      return ele.offsetHeight
    }
    return ele.offsetWidth
  }, [wrapperRef, direction])

  const currentIndex = (() => {
    if (activeIndex === 0) {
      return childrenArray.length - 1
    } else if (activeIndex === childrenArray.length + 1) {
      return 0
    }
    return activeIndex - 1
  })()

  useUpdate(() => {
    onChange(currentIndex)
  }, [currentIndex, onChange, childrenArray])

  React.useEffect(() => {
    const handler = () => {
      setSize(calculateSize())
    }
    handler()
    on('resize', handler)
    return () => off('resize', handler)
  }, [calculateSize])

  React.useEffect(() => {
    if (tempIndex && !isAnimate) {
      setAnimate(true)
      setActiveIndex(tempIndex)
      setTempIndex(null)
    }
  }, [tempIndex, isAnimate])

  const changeSlide = React.useCallback((index: number) => {
    setActiveIndex(prev => {
      if (prev === childrenArray.length + 1) {
        setAnimate(false)
        setTempIndex(index)
        return 1
      } else if (prev === 0) {
        setAnimate(false)
        setTempIndex(index)
        return childrenArray.length
      } else {
        setAnimate(true)
        return index
      }
    })
  }, [childrenArray])

  const toPrev = React.useCallback(() => {
    if (childrenArray.length <= 1) {
      return
    }
    if (loop) {
      setActiveIndex(prev => {
        if (prev === 0) {
          setAnimate(false)
          setTempIndex(childrenArray.length - 1)
          return childrenArray.length
        } else {
          setAnimate(true)
          return prev - 1
        }
      })
    } else {
      setActiveIndex(prev => {
        setAnimate(true)
        if (prev === 1) {
          return childrenArray.length
        } else {

          return prev - 1
        }
      })
    }
  }, [loop, childrenArray])

  const toNext = React.useCallback(() => {
    if (childrenArray.length <= 1) {
      return
    }
    if (loop) {
      setActiveIndex(prev => {
        if (prev === childrenArray.length + 1) {
          setAnimate(false)
          setTempIndex(2)
          return 1
        } else {
          setAnimate(true)
          return prev + 1
        }
      })
    } else {
      setActiveIndex(prev => {
        setAnimate(true)
        if (prev === childrenArray.length) {
          return 1
        } else {
          return prev + 1
        }
      })
    }
  },[loop, childrenArray])

  React.useEffect(() => {
    if (hover || drag || !autoPlay) {
      return
    }
    const id = setInterval(toNext, autoPlayDuration)
    return () => {
      clearTimeout(id)
    }
  }, [autoPlay, hover, autoPlayDuration, toNext, drag])

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
  }, [childrenArray, size, direction])

  const dotsNode = dots && (
          <ul className={`${prefixCls}__dot-list`}>
              {childrenArray.map((_item, index) => {
                const _classes = classnames(`${prefixCls}__dot`)
                const onDotClick = () => {
                  if (dotTrigger === 'click') {
                    changeSlide(index + 1)
                  }
                }
                const onDotMouseEnter = () => {
                  if (dotTrigger === 'hover') {
                    changeSlide(index + 1)
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

  const listClasses = classnames(`${prefixCls}__item-list`,{
    [`${prefixCls}__item-list--animate`] : isAnimate
  })

  const listStyle = (() => {
    const totalSize = (childrenArray.length + 2) * size
    const style: React.CSSProperties = {
      [direction === 'vertical' ? 'height' : 'width']: totalSize
    }

    let _distance = distance
    // 拖拽不允许超出最后一张幻灯片和第一张幻灯片
    if ((activeIndex >= childrenArray.length && _distance > 0) || (activeIndex <= 1 && _distance < 0)) {
      _distance = 0
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
          show={((loop && childrenArray.length > 1) || currentIndex > 0) && (arrow === 'always' || (arrow === 'hover' && hover))}
          classNames={`${prefixCls}__arrow--fade`}
      >
        <button
            className={`${prefixCls}__arrow ${prefixCls}__arrow--first`}
            onClick={toPrev}
        >
          {direction === 'vertical' ? <FasAngleUp/> : <FasAngleLeft />}
        </button>
      </CssTransition>
      <CssTransition
          forceRender={true}
          show={((loop && childrenArray.length > 1) || currentIndex < childrenArray.length - 1) && (arrow === 'always' || (arrow === 'hover' && hover))}
          classNames={`${prefixCls}__arrow--fade`}
      >
        <button
            className={`${prefixCls}__arrow ${prefixCls}__arrow--last`}
            onClick={toNext}
        >
          {direction === 'vertical' ? <FasAngleDown/> : <FasAngleRight/>}
        </button>
      </CssTransition>
    </>
  )

  const classes = classnames(prefixCls,`${prefixCls}--${direction}`)

  const cb = React.useCallback((start: DragPosition, _end: DragPosition, isEnd: boolean) => {
    // 单个幻灯片不允许移动
    if (childrenArray.length === 1) {
      return
    }
    setDrag(true)

    // 判断当前幻灯片临界情况
    setActiveIndex(prev => {
      // 禁止动画
      setAnimate(false)

      // 末尾，切到第一张幻灯片
      if (prev === childrenArray.length + 1) {
        return 1
      }
      // 开头，切换到最后一张幻灯片
      if (prev === 0) {
        return childrenArray.length
      }

      return prev
    })

    // 向左滑动实际是向右切换
    const _distance = direction === 'horizontal' ? start.x - _end.x : start.y - _end.y
    setAnimate(false)
    setDistance(moveRatio * _distance)

    if (isEnd) {
      setDrag(false)
      if (_distance === 0) {
        return
      }
      setAnimate(true)
      // 判断需要切换幻灯片数量
      const abs = Math.abs(_distance)
      const num = Math.floor((abs + size * (1 - moveThreshold)) / size) * (_distance / abs)

      setActiveIndex(prev => {
        let target = prev + num
        if (target < 1) {
          target = 1
        } else if (target > childrenArray.length) {
          target = childrenArray.length
        }
        return target
      })
      setDistance(0)
    }
  },[moveRatio, direction, size, childrenArray, moveThreshold])

  const ref = React.useRef<HTMLDivElement>(null)

  useDrag(ref, cb)

  return (
    <div
      ref={ref}
      className={classes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
        <div className={`${prefixCls}__item-list-wrapper`} style={{ height, width }} ref={wrapperRef}>
          <div className={listClasses} style={listStyle} ref={listRef}>
            {childrenContainer}
          </div>
        </div>
        {arrowNode}
        {dotsNode}
    </div>
  )
}

Carousel.displayName = displayName

const checkMoveRadio: PropTypes.Validator<number> = (props, propName) => {
  // @ts-ignore
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

const checkMoveThreshold: PropTypes.Validator<number> = (props, propName) => {
  // @ts-ignore
  const val = props[propName]
  if (val !== undefined) {
    if (typeof val === 'number') {
      if (val <= 0 || val >= 1) {
        return new Error(`${propName} should be between 0 and 1 except 0 and 1`)
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
  children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.arrayOf(PropTypes.element.isRequired)]).isRequired,
  circleDot: PropTypes.bool,
  defaultIndex: PropTypes.number,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  dotRender: PropTypes.func,
  dotTrigger: PropTypes.oneOf(['hover', 'click']),
  dots: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loop: PropTypes.bool,
  moveRatio: checkMoveRadio,
  moveThreshold: checkMoveThreshold,
  onChange: PropTypes.func,
  prefixCls: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Carousel
