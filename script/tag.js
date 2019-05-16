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
  if (needCommit()) {
    console.error(chalk.red('Please commit changed file first.'))
    shell.exit(1)
  }

  const oldCommitId = getLastCommit()

  // 修改版本
  const version = `${answers.version}`
  pkg.version = version
  fs.writeFileSync(
    resolvePath('package.json'),
    JSON.stringify(pkg, null, '  ')
  )

  // 提交代码
  const comment = answers.message

  console.log(chalk.green('======try to commit======'))

  let cmd = `git add package.json && git commit -m "${comment}" --no-verify`

  if (shell.exec(cmd).code) {
    console.log(chalk.red('======commit failed======'))
    console.log(chalk.red('======try to rollback======'))
    shell.exec(`git reset --hard ${oldCommitId}`)
    shell.exit(1)
  }
  console.log(chalk.green('======commit success======'))

  console.log(chalk.green(`======publish tag "${version}"======`))
  const commitId = getLastCommit()
  cmd = `git tag -a ${version} ${commitId} -m "${comment}" && git push origin ${version}`

  if (shell.exec(cmd).code) {
    console.log(chalk.red(`======publish tag "${version}" failed======`))
    console.log(chalk.red('======try to rollback======'))
    shell.exec(`git reset --hard ${oldCommitId}`)
    shell.exit(1)
  }
  console.log(chalk.green(`======publish tag "${version}" success======`))
})

function getVersionList (version) {
  const levels = [
    ['prerelease', 'beta'],
    ['patch', ''],
    ['minor', ''],
    ['major', '']
  ]
  const opts = []

  levels.forEach(function (item) {
    const val = semver.inc(version, item[0], item[1])
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

function getLastCommit () {
  const ret = shell.exec('git show', {
    silent: true
  })
  if (ret.code === 1) {
    console.error(chalk.red('exec command "git show" failed'))
    shell.exit(1)
  }
  const commitLine = ret.stdout.split('\n')[0]
  const commit = commitLine.substring('commit '.length)
  console.log(commit)
  return commit
}

function needCommit () {
  let ret = shell.exec('git status --porcelain', {
    silent: true
  })
  if (ret.code === 1) {
    return false
  }
  return ret.trim() !== ''
}
