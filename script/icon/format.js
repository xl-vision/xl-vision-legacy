const data = require('./icons/ionicons/src/data.json')
const fs = require('fs-extra')
const toCamel = require('./toCamel')
const path = require('path')

const icons = data.icons

const ret = {}
for (const icon of icons) {
  const name = icon.name
  const tags = icon.tags
  const relName = toCamel(name)
  ret[relName] = tags
}

// 写入icon-select目录
fs.outputFileSync(
  path.join(__dirname, '../..', 'site/components/icon-select/data.json'),
  JSON.stringify(ret)
)
