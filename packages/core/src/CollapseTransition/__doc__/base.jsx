import React from 'react'
import { CollapseTransition, Button, createUseStyles } from '@xl-vision/core'

export default () => {
  const styles = useStyles()

  const [active, setActive] = React.useState(false)

  const handleClick = React.useCallback(() => {
    setActive((prev) => !prev)
  }, [])

  return (
    <div className='wrapper'>
      <Button theme='primary' onClick={handleClick}>
        Click
      </Button>
      <CollapseTransition in={active} transitionClasses={styles.demo}>
        <div className={styles.demo}>DEMO</div>
      </CollapseTransition>
    </div>
  )
}

const useStyles = createUseStyles((theme) => ({
  demo: {
    fontSize: '3rem',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150px',
    backgroundColor: theme.color.themes.primary,
    color: theme.color.getContrastColor(theme.color.themes.primary).text.primary,
    margin: '10px',
    '&-enter-active, &-leave-active': {
      transition: 'all 1s ease'
    },
    '&-enter, &-leave-to': {
      opacity: 0
    },
    '&-enter-to, &-leave': {
      opacity: 1
    }
  }
}))
