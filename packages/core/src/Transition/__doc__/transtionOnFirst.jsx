import React from 'react'
import { Transition, Button, createUseStyles } from '@xl-vision/core'

export default () => {
  const [show, setShow] = React.useState(true)
  const styles = useStyles()

  const beforeEnter = React.useCallback((el) => {
    el.style.height = el.style.height || 0
  }, [])

  const enter = React.useCallback((el, done, isCancelled) => {
    let height = Number(el.style.height.substring(0, el.style.height.indexOf('px')) || 0)
    const timer = setInterval(() => {
      if (isCancelled()) {
        clearInterval(timer)
        return
      }
      if (height > 200) {
        clearInterval(timer)
        done()
        return
      }
      height += 2
      el.style.height = `${height}px`
    }, 20)
  }, [])

  const leave = React.useCallback((el, done, isCancelled) => {
    let height = Number(el.style.height.substring(0, el.style.height.indexOf('px')) || 200)
    const timer = setInterval(() => {
      if (isCancelled()) {
        clearInterval(timer)
        return
      }
      if (height < 0) {
        clearInterval(timer)
        done()
        return
      }
      height -= 2
      el.style.height = `${height}px`
    }, 20)
  }, [])

  const handleClick = React.useCallback(() => {
    setShow((prev) => !prev)
  }, [])

  return (
    <div>
      <Button theme='primary' onClick={handleClick}>
        Click
      </Button>
      <p>进场动画</p>
      <Transition
        transitionOnFirst={true}
        in={show}
        beforeEnter={beforeEnter}
        enter={enter}
        leave={leave}
      >
        <div className={styles.demo}>DEMO</div>
      </Transition>
      <p>出场动画</p>
      <Transition
        transitionOnFirst={true}
        in={!show}
        beforeEnter={beforeEnter}
        enter={enter}
        leave={leave}
      >
        <div className={styles.demo}>DEMO</div>
      </Transition>
    </div>
  )
}

const useStyles = createUseStyles((theme) => {
  return {
    demo: {
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      backgroundColor: theme.color.themes.primary,
      color: theme.color.getContrastColor(theme.color.themes.primary).text.primary,
      fontSize: '3rem',
      marginTop: '16px',
      borderRadius: '4px'
    }
  }
})
