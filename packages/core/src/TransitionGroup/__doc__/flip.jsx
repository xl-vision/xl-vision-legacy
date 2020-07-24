import React from 'react'
import { TransitionGroup, Button, createUseStyles } from '@xl-vision/core'

export default () => {
  const styles = useStyles()

  const nextNumRef = React.useRef(10)

  const [items, setItems] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  const handleAdd = React.useCallback(() => {
    setItems((prev) => {
      const index = parseInt(Math.random() * prev.length, 10)
      prev.splice(index, 0, nextNumRef.current++)
      return [...prev]
    })
  }, [])

  const handleRemove = React.useCallback(() => {
    setItems((prev) => {
      const index = parseInt(Math.random() * prev.length, 10)
      prev.splice(index, 1)
      return [...prev]
    })
  }, [])

  return (
    <div>
      <Button.Group theme='primary'>
        <Button onClick={handleAdd}>add</Button>
        <Button onClick={handleRemove}>remove</Button>
      </Button.Group>
      <div className={styles.list}>
        <TransitionGroup transitionClasses={styles.item}>
          {items.map((it) => (
            <span key={it} className={styles.item}>
              {it}
            </span>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  list: {
    position: 'relative',
    marginTop: '10px'
  },
  item: {
    display: 'inline-block',
    marginRight: '10px',

    '&-enter-active, &-leave-active': {
      transition: 'all 1s ease'
    },
    // 使动画流畅
    '&-leave-active': {
      position: 'absolute'
    },
    '&-leave-to, &-enter': {
      opacity: 0
    },
    '&-leave, &-enter-to': {
      opacity: 1,
      transform: 'translateY(0px)'
    },
    '&-enter': {
      transform: 'translateY(-30px)'
    },
    '&-leave-to': {
      transform: 'translateY(30px)'
    },
    // 重点
    '&-move': {
      transition: 'transform 1s ease-in-out'
    }
  }
})
