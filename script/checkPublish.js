'use strict'
const chalk = require('chalk')
const shell = require('shelljs')

checkPublish()

function checkPublish () {
  const travis = process.env.TRAVIS

  if (travis) {
    return
  }
  console.log(chalk.red('Please use command "npm run release" to publish a new version'))
  shell.exit(1)
}
