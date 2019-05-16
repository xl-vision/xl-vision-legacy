'use strict'
const shell = require('shelljs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const semver = require('semver')
const fs = require('fs-extra')
const path = require('path')

if (!shell.which('git')) {
  console.log(chalk.red('git不存在，请先安装git'))
  shell.exit(1)
}

const pkg = require(resolvePath('package.json'))

const oldVersion = pkg.version

const versionList = getVersionList(oldVersion)

inquirer.prompt([{
  name: 'version',
  message: `选择要升级的版本(当前版本${oldVersion})`,
  type: 'list',
  default: 0,
  choices: versionList
},
{
  name: 'message',
  message: '版本发布说明',
  type: 'input',
  default: function (answers) {
    return `:bookmark:update version to ${answers.version}`
  }
}]).then(async function (answers) {
  // 修改版本
  const version = `${answers.version}`
  pkg.version = version
  fs.writeFileSync(
    resolvePath('package.json'),
    JSON.stringify(pkg, null, '  ')
  )

  // 提交代码
  const comment = answers.message

  console.log(chalk.green('======提交代码到github======'))

  let cmd = `git add package.json && git commit -m "${comment}" && git push origin master`

  if (shell.exec(cmd).code) {
    pkg.version = oldVersion
    fs.writeFileSync(
      resolvePath('package.json'),
      JSON.stringify(pkg, null, '  ')
    )
    console.log(chalk.red('======提交代码失败======'))
    shell.exit(1)
  }
  console.log(chalk.green('======提交代码成功======'))

  console.log(chalk.green(`======发布版本"${version}"到github======`))
  cmd = `git tag -a ${version} -m "${comment}" && git push origin ${version}`

  if (shell.exec(cmd).code) {
    console.log(chalk.red(`======发布版本"${version}"失败======`))
    shell.exit(1)
  }
  console.log(chalk.green(`======发布版本"${version}"成功======`))
})

function getVersionList (version) {
  var levels = [
    ['prerelease', 'beta'],
    ['patch', ''],
    ['minor', ''],
    ['major', '']
  ]
  var opts = []

  levels.forEach(function (item) {
    var val = semver.inc(version, item[0], item[1])
    opts.push({
      name: val,
      value: val
    })
  })

  return opts
}

function resolvePath (file) {
  return path.resolve(__dirname, '..', file)
}
