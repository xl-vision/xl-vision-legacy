const { getOptions } = require('loader-utils')
const mdx = require('@mdx-js/mdx')
const prism = require('@mapbox/rehype-prism')
const createDemoBoxPlugin = require('./createDemoBoxPlugin')

const DEFAULT_RENDERER = `
import React from 'react'
import { mdx } from '@mdx-js/react'
`
const loader = async function (content) {
  const callback = this.async()
  const options = { ...getOptions(this), filepath: this.resourcePath }

  let result

  try {
    result = await mdx(content, {
      rehypePlugins: [prism],
      remarkPlugins: [createDemoBoxPlugin(this)],
      ...options
    })
  } catch (err) {
    return callback(err)
  }

  const { renderer = DEFAULT_RENDERER } = options

  const code = `${renderer}\n${result}`
  return callback(null, code)
}

module.exports = loader
