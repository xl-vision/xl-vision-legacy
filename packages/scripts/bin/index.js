#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
const program = require('commander')
const chalk = require('chalk')
const compileTs = require('../src/compileTs')

const scripts = [
  {
    name: 'compileTs',
    desc: 'compileTs',
    script: compileTs,
    options: []
  }
]

program.version(require('../package.json').version)

for (const script of scripts) {
  const exec = program.command(script.name).description(script.desc || '')
  for (const option of script.options || []) {
    let optionStr = `--${option.name}`
    if (!option.bool) {
      optionStr += option.required ? ` <${option.name}>` : ` [${option.name}]`
    }
    if (option.handler) {
      exec.option(optionStr, option.desc, option.handler, option.defaultValue)
    } else {
      exec.option(optionStr, option.desc, option.defaultValue)
    }
  }
  exec.action(async (options) => {
    const keys = Object.keys(options).filter(
      (it) => !it.startsWith('_') && !['parent', 'commands', 'options'].includes(it)
    )
    const opt = {}
    keys.forEach((it) => {
      opt[it] = options[it]
    })
    const start = Date.now()
    // eslint-disable-next-line no-console
    console.info(chalk.green(`task '${script.name}' is started`))
    try {
      await script.script(opt)
      // eslint-disable-next-line no-console
      console.info(chalk.green(`task '${script.name}' is finished: ${Date.now() - start} ms`))
    } catch (e) {
      console.error(chalk.red(`task '${script.name}' is finished with error: `))
      console.error(e.message)
      process.exit(1)
    }
  })
}

program.parse(process.argv)
