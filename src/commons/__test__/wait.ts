import { act } from 'react-dom/test-utils'

export default (time: number) => {
  const wait = new Promise<void>(resolve => {
    // console.info(`wait time: ${time}`)
    setTimeout(() => {
      resolve()
    }, time)
  })

  return act(() => wait)
}
