const fs = require('fs-extra')
const path = require('path')
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
  path.join(__dirname, '../..', 'site/components/icon-select/data.json'),
  JSON.stringify(ret)
)
