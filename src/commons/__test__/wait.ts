export default (time: number) => {
  return new Promise((resolve, _reject) => {
    // tslint:disable-next-line:no-console
    console.log(`wait time: ${time}`)
    setTimeout(() => {
      resolve()
    }, time)
  })
}
