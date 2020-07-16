module.exports = (str, heading = true) => {
  const newStr = str.replace(/_(\w)/g, (_all, letter) => {
    return letter.toUpperCase()
  })

  if (heading) {
    return newStr.replace(/^(.)/, (_all, letter) => {
      return letter.toUpperCase()
    })
  }

  return newStr
}
