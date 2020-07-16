/* eslint-disable no-console */
const inquirer = require('inquirer')
const chalk = require('chalk')
const semver = require('semver')
const path = require('path')
const standardVersion = require('standard-version')
const simpleGit = require('simple-git/promise')
const fetch = require('node-fetch')

const git = simpleGit(process.cwd())

run()

async function run() {
  const status = await git.status()

  const allowBranches = ['origin/master']

  if (!allowBranches.includes(status.tracking)) {
    console.log(chalk.yellow('🤔 You are not in the origin/master branch!\n'))
  }

  if (status.files.length > 0) {
    console.log(chalk.yellow('🤔 Please commit changed file first.\n'))
    return
  }

  // eslint-disable-next-line import/no-dynamic-require, global-require
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
        choices: versionList.map((it) => it.version)
      }
    ])
    .then(async (answers) => {
      const oldCommitId = (await git.log()).latest.hash

      const { version } = answers

      const { versions } = await fetch('http://registry.npmjs.org/xl-vision').then((res) =>
        res.json()
      )
      if (version in versions) {
        console.log(chalk.yellow('😈 The new version already exists. Forget update package.json?'))
        console.log(chalk.cyan(' => Now:'), version, '\n')
        return
      }

      const versionObject = versionList.filter((it) => it.version === version)[0]

      const options = {
        noVerify: true,
        infile: 'CHANGELOG.md',
        silent: true,
        changelogHeader: '# Changelog',
        types: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'perf', section: 'Improvement' },
          { type: 'refactor', section: 'Refactor' }
        ]
      }

      options[versionObject.isReleased ? 'releaseAs' : 'prerelease'] = versionObject.option

      try {
        await standardVersion(options)

        console.log(chalk.green('======Upload files======'))
        await git.push('origin', 'master')
        await git.pushTags('origin')

        console.log(chalk.green('======Upload files success======'))
      } catch (err) {
        console.error(chalk.red(`Release failed with message: ${err.message}`))
        console.log(chalk.red('======Try to rollback======'))
        await git.tag(['--delete', `v${version}`])
        await git.reset(['--hard', oldCommitId])
        console.log(chalk.red('======Rollback success======'))
      }
    })
}

function getVersionList(version) {
  const levels = [
    ['prerelease', 'beta'],
    ['patch', ''],
    ['minor', ''],
    ['major', '']
  ]
  const opts = []

  levels.forEach((item) => {
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
