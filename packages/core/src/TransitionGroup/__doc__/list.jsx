import React from 'react'
import { TransitionGroup } from '@xl-vision/core'

const data = ['Bruce Lee', 'Jackie Chan', 'Chuck Norris', 'Jet Li', 'Kung Fury']

export default () => {
  const [list, setList] = React.useState(data)

  const handleChange = React.useCallback((e) => {
    const { value } = e.target
    setList(() => {
      if (!value) {
        return data
      }
      return data.filter((it) => it.includes(value))
    })
  }, [])

  const beforeEnter = React.useCallback((el) => {
    el.style.opacity = 0
    el.style.height = 0
    el.style.transition = `all ${el.dataset.index * 150}ms ease`
  }, [])

  const enter = React.useCallback((el, done) => {
    // reflow
    // eslint-disable-next-line no-unused-expressions
    document.body.scrollHeight
    el.style.opacity = 1
    el.style.height = '1.6em'
    done()
  }, [])

  const beforeLeave = React.useCallback((el) => {
    el.style.opacity = 1
    el.style.height = '1.6em'
    el.style.transition = `all ${el.dataset.index * 150}ms ease`
  }, [])

  const leave = React.useCallback((el) => {
    // reflow
    // eslint-disable-next-line no-unused-expressions
    document.body.scrollHeight
    el.style.opacity = 0
    el.style.height = 0
  }, [])

  return (
    <div className='demo'>
      <input onChange={handleChange} />
      <ul>
        <TransitionGroup
          beforeEnter={beforeEnter}
          enter={enter}
          beforeLeave={beforeLeave}
          leave={leave}
        >
          {list.map((it, index) => (
            <li data-index={index + 1} key={it}>
              {it}
            </li>
          ))}
        </TransitionGroup>
      </ul>
    </div>
  )
}
