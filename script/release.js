'use strict'
const shell = require('shelljs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const semver = require('semver')
const path = require('path')
const standardVersion = require('standard-version')

run()

function run() {
  if (!shell.which('git')) {
    console.log(chalk.red('git不存在，请先安装git'))
    return
  }

  if (needCommit()) {
    console.error(chalk.red('Please commit changed file first.'))
    return
  }

  const pkg = require(resolvePath('package.json'))

  const oldVersion = pkg.version

  const versionList = getVersionList(oldVersion)

  inquirer
    .prompt([
      {
        name: 'version',
        message: `选择要升级的版本(当前版本${oldVersion})`,
        type: 'list',
        default: 0,
        choices: versionList.map(it => it.version)
      }
    ])
    .then(async function(answers) {
      const oldCommitId = getLastCommit()

      const version = answers.version

      const versionObject = versionList.filter(it => it.version === version)[0]

      const options = {
        noVerify: true,
        infile: 'CHANGELOG.md',
        silent: true,
        changelogHeader: '# Changelog',
        types: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'improvement', section: 'Improvement' },
          { type: 'refactor', section: 'Refactor' }
        ]
      }

      options[versionObject.isReleased ? 'releaseAs' : 'prerelease'] = versionObject.option

      try {
        await standardVersion(options)

        console.log(chalk.green('======upload files======'))
        const cmd = `git push --follow-tags origin master --no-verify`
        if (shell.exec(cmd).code) {
          throw new Error('upload files failed')
        }

        console.log(chalk.green('======upload files success======'))
      } catch (err) {
        console.error(chalk.red(`release failed with message: ${err.message}`))
        console.log(chalk.red('======try to rollback======'))
        shell.exec(`git tag -d v${version}`)
        shell.exec(`git reset --hard ${oldCommitId}`)
      }
    })
}

function getVersionList(version) {
  const levels = [['prerelease', 'beta'], ['patch', ''], ['minor', ''], ['major', '']]
  const opts = []

  levels.forEach(function(item) {
    const val = semver.inc(version, item[0], item[1])
    const isReleased = item[0] !== 'prerelease'
    opts.push({
      isReleased,
      option: isReleased ? item[0] : item[1],
      version: val
    })
  })

  return opts
}

function resolvePath(file) {
  return path.resolve(__dirname, '..', file)
}

function getLastCommit() {
  const ret = shell.exec('git show', {
    silent: true
  })
  if (ret.code === 1) {
    console.error(chalk.red('exec command "git show" failed'))
    shell.exit(1)
  }
  const commitLine = ret.stdout.split('\n')[0]
  const commit = commitLine.substring('commit '.length)
  return commit
}

function needCommit() {
  const ret = shell.exec('git status --porcelain', {
    silent: true
  })
  if (ret.code === 1) {
    return false
  }
  return ret.trim() !== ''
}
