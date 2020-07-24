import React from 'react'
import { CSSTransition, Button, createUseStyles } from '@xl-vision/core'

export default () => {
  const [active, setActive] = React.useState(true)
  const styles = useStyles()

  const handleClick = React.useCallback(() => {
    setActive((prev) => !prev)
  }, [])

  return (
    <div>
      <Button theme='primary' onClick={handleClick}>
        Click
      </Button>
      <p>进场</p>
      <CSSTransition transitionOnFirst={true} in={active} transitionClasses={styles.demo}>
        <div className={styles.demo}>DEMO</div>
      </CSSTransition>
      <p>出场</p>
      <CSSTransition transitionOnFirst={true} in={!active} transitionClasses={styles.demo}>
        <div className={styles.demo}>DEMO</div>
      </CSSTransition>
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
      height: '150px',
      backgroundColor: theme.color.themes.primary,
      color: theme.color.getContrastColor(theme.color.themes.primary).text.primary,
      fontSize: '3rem',
      marginTop: '16px',
      borderRadius: '4px',
      '&-enter-active, &-leave-active, &-appear-active, &-disappear-active': {
        transition: 'all 2s ease'
      },
      '&-leave-to, &-enter, &-appear, &-disappear-to': {
        height: 0,
        opacity: 0
      },
      '&-leave, &-enter-to, &-appear-to, &-disappear': {
        opacity: 1
      }
    }
  }
})
