import React from 'react'
import { TransitionGroup, Button, createUseStyles } from '@xl-vision/core'

export default () => {
  const styles = useStyles()

  const [items, setItems] = React.useState(() => {
    const arr = []
    for (let i = 0; i < 81; i++) {
      arr.push(i)
    }
    return arr
  })

  const handleShuffle = React.useCallback(() => {
    setItems((prev) => {
      const arr = []
      let i = prev.length
      while (i > 0) {
        const index = Math.floor(Math.random() * i)
        const item = prev.splice(index, 1)[0]
        arr.push(item)
        i--
      }
      return arr
    })
  }, [])

  return (
    <div>
      <Button.Group theme='primary'>
        <Button onClick={handleShuffle}>shuffle</Button>
      </Button.Group>
      <div className={styles.box}>
        <TransitionGroup transitionClasses={styles.item}>
          {items.map((it) => (
            <div key={it} className={styles.item}>
              {it}
            </div>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}

const useStyles = createUseStyles((theme) => ({
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
    width: '238px'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '25px',
    height: '25px',
    border: `1px solid ${theme.color.getContrastColor().divider}`,
    margin: '0 -1px -1px 0',
    '&:nth-child(3n)': {
      marginRight: 0
    },
    '&:nth-child(27n)': {
      marginBottom: 0
    },
    '&-move': {
      transition: 'transform 1s ease'
    }
  }
}))
