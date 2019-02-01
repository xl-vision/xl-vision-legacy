'use strict'
const shell = require('shelljs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const semver = require('semver')
const fs = require('fs-extra')
const ghpages = require('gh-pages')
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
  },
  {
    name: 'docs',
    message: '是否重新发布文档',
    type: 'confirm',
    default: true
  }
]).then(async function (answers) {

  console.log(chalk.green('======运行代码检查======'))
  if (shell.exec(`npm run tslint`).code) {
    console.log(chalk.red(`======代码检查未通过======`))
    shell.exit(1)
  }
  console.log(chalk.green('======代码检查完成======'))

  console.log(chalk.green('======运行测试用例======'))
  if (shell.exec(`npm run test`).code) {
    console.log(chalk.red(`======测试用例未通过======`))
    shell.exit(1)
  }
  console.log(chalk.green('======运行测试用例通过======'))

  console.log(chalk.green('======编译源码======'))
  if (shell.exec(`npm run compile`).code) {
    console.log(chalk.red(`======npm run compile失败======`))
    shell.exit(1)
  }

  if (shell.exec(`npm run dist`).code) {
    console.log(chalk.red(`======npm run dist失败======`))
    shell.exit(1)
  }
  console.log(chalk.green('======编译源码完成======'))

  const version = `${answers.version}`
  pkg.version = version
  fs.writeFileSync(
    resolvePath('package.json'),
    JSON.stringify(pkg, null, '  ')
  )

  //提交代码
  const comment = answers.message

  console.log(chalk.green('======提交代码到github======'))

  let cmd = `git add . && git commit -m "${comment}" && git push origin master`

  if (shell.exec(cmd).code) {
    pkg.version = oldVersion
    fs.writeFileSync(
      resolvePath('package.json'),
      JSON.stringify(pkg, null, '  ')
    )
    console.log(chalk.red(`======提交代码失败======`))
    shell.exit(1)
  }
  console.log(chalk.green(`======提交代码成功======`))

  console.log(chalk.green(`======发布版本"${version}"到github======`))
  cmd = `git tag -a ${version} -m "${comment}" && git push origin ${version}`
  if (shell.exec(cmd).code) {
    console.log(chalk.red(`======发布版本"${version}"失败======`))
    shell.exit(1)
  }
  console.log(chalk.green(`======发布版本"${version}"到github成功======`))

  if (answers.docs) {
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
    await new Promise((resolve, reject) => {
      ghpages.publish(docsPath, err => {
        if (err) {
          console.log(chalk.red('======发布文档失败======'))
          shell.exit(1)
        } else {
          console.log(chalk.green('======发布文档成功======'))
          resolve()
        }
      })
    })
  }
  console.log(chalk.green(`======正在发布到npm仓库，请稍等======`))
})

function getVersionList(version) {
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

function resolvePath(file) {
  return path.resolve(__dirname, '..', file)
}