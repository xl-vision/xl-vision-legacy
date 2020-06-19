module.exports = (str, heading = true) => {
  let tempStr = ''
  let flag = heading
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i)
    if (flag) {
      char = char.toUpperCase()
      flag = false
    } else if (char === '-') {
      flag = true
      continue
    }
    tempStr += char
  }
  return tempStr
}
