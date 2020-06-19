'use strict'
const chalk = require('chalk')

checkPublish()

function checkPublish() {
  const actions = process.env.GITHUB_ACTIONS

  if (actions) {
    return
  }
  console.log(chalk.yellow('Please use command "npm run release" to publish a new version'))
  process.exit(1)
}
