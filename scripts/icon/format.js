const fs = require('fs-extra')
const path = require('path')
// eslint-disable-next-line import/no-unresolved
const data = require('./icons/ionicons/src/data.json')
const toCamel = require('./toCamel')

const { icons } = data

const ret = {}
icons.forEach((icon) => {
  const { name, tags } = icon
  const relName = toCamel(name)
  ret[relName] = tags
})

// 写入icon-select目录
fs.outputFileSync(
  path.join(__dirname, '../..', 'site/components/IconSelect/data.json'),
  JSON.stringify(ret)
)
