'use strict'
const shell = require('shelljs')
const chalk = require('chalk')
const ghpages = require('gh-pages')
const path = require('path')

if (!shell.which('git')) {
  console.log(chalk.red('git不存在，请先安装git'))
  shell.exit(1)
}

const docsPath = resolvePath('docs/dist')
// console.log(chalk.green('删除生成的文档'))
// fs.removeSync(docsPath)
console.log(chalk.green('======编译文档======'))
if (shell.exec(`cd docs && npm run build`).code) {
  console.log(chalk.red('======编译文档失败======'))
  shell.exit(1)
}
console.log(chalk.green('======编译文档成功======'))

console.log(chalk.green('======正在发布文档======'))
ghpages.publish(docsPath, err => {
  if (err) {
    console.log(chalk.red('======发布文档失败======'))
    shell.exit(1)
  } else {
    console.log(chalk.green('======发布文档成功======'))
    resolve()
  }
})


function resolvePath(file) {
  return path.resolve(__dirname, '..', file)
}