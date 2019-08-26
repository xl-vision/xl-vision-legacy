export default (time: number) => {
  return new Promise(resolve => {
    console.log(`wait time: ${time}`)
    setTimeout(() => {
      resolve()
    }, time)
  })
}
