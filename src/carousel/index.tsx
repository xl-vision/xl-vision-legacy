import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
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
  height?: number | string
  loop?: boolean
  onChange?: (current: number) => void
  prefixCls?: string
  width?: number | string
}

export const displayName = `${namePrefix}-carousel`

const Carousel: React.FunctionComponent<CarouselProps> = props => {
  const {
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
  const [isAnimate, setAnimate] = React.useState(false)

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

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
    if (hover || !autoPlay) {
      return
    }
    const id = setInterval(toNext, autoPlayDuration)
    return () => {
      clearTimeout(id)
    }
  }, [autoPlay, hover, autoPlayDuration, toNext])

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
                const onClick = () => changeSlide(index + 1)
                return (
                      <li key={index} className={_classes} onClick={onClick}>
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
    const style: React.CSSProperties = {
      [direction === 'vertical' ? 'height' : 'width']: (childrenArray.length + 2) * size
    }
    const distance = size * activeIndex

    if (direction === 'vertical') {
      style.transform = `translate(0, -${distance}px)`
    } else {
      style.transform = `translate(-${distance}px, 0)`
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

  return (
    <div
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

Carousel.propTypes = {
  arrow: PropTypes.oneOf(['hover', 'always', 'none']),
  autoPlay: PropTypes.bool,
  autoPlayDuration: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.arrayOf(PropTypes.element.isRequired)]).isRequired,
  circleDot: PropTypes.bool,
  defaultIndex: PropTypes.number,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  dotRender: PropTypes.func,
  dots: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loop: PropTypes.bool,
  onChange: PropTypes.func,
  prefixCls: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Carousel
