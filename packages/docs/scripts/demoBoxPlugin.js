const path = require('path')
const fs = require('fs')
const { languages, highlight } = require('prismjs')
const loadLanguages = require('prismjs/components/')
const HTMLtoJSX = require('htmltojsx')

const NAME = 'demo'

const regex = new RegExp(`^:::[\t\f ]*${NAME}[\t\f ]*(?<title>.*?)$`)

const C_NEWLINE = '\n'

module.exports = function () {
  const Parser = this.Parser
  const process = this.processSync
  const blockTokenizers = Parser.prototype.blockTokenizers
  const blockMethods = Parser.prototype.blockMethods

  const render = (source) => {
    const ret = process(source).contents.toString()
    let lines = ret.split('\n')
    let i = 0
    while (i < lines.length) {
      const line = lines[i]
      if (line.trim().startsWith('return <MDXLayout')) {
        break
      }
      i++
    }
    lines = lines.slice(i + 1)
    i = 0
    while (i < lines.length) {
      const line = lines[i]
      if (line.trim().startsWith('</MDXLayout>')) {
        break
      }
      i++
    }
    lines = lines.slice(0, i)
    return lines.join('\n').trim()
  }

  blockTokenizers[NAME] = function demo(eat, value) {
    if (!value.startsWith(':::')) {
      return
    }

    let idx = 0

    let title = ''

    const lines = []

    let flag = false

    while ((idx = value.indexOf(C_NEWLINE)) !== -1) {
      const line = value.slice(0, idx)
      if (!flag) {
        const m = regex.exec(line)
        if (!m) {
          return
        }
        title = m.groups.title
      }

      lines.push(line)

      if (flag && line === ':::') {
        break
      }

      flag = true
      value = value.slice(idx + 1)
    }

    // 没有找到结束的:::
    if (value.indexOf(C_NEWLINE) === -1) {
      return
    }

    // find desc
    let descEndLine = 1
    for (; descEndLine < lines.length; descEndLine++) {
      const line = lines[descEndLine]
      if (line.startsWith('---')) {
        break
      }
    }

    if (descEndLine >= lines.length) {
      return
    }

    const desc = lines
      .slice(1, descEndLine - 1)
      .join('\n')
      .trim()

    const codePath = lines
      .slice(descEndLine + 1, lines.length - 1)
      .join('\n')
      .trim()

    const node = {
      type: NAME,
      title,
      desc,
      codePath
    }
    eat(lines.join('\n'))(node)
  }

  blockMethods.splice(0, 0, NAME)

  return function (node, file) {
    const demoboxs = getDemoBox(node)
    for (let i = 0; i < demoboxs.length; i++) {
      const demo = demoboxs[i]
      const title = render(demo.title)
      const desc = render(demo.desc)
      const codePath = demo.codePath
      node.children.splice(0, 0, {
        type: 'import',
        value: `import Demo${i} from '${codePath}'`
      })

      const content = getContent(file, codePath)

      const code = highlightCode('jsx', content)

      demo.type = 'jsx'
      demo.value = `<DemoBox title={${title}} desc={<>${desc}</>} code={${code}}><Demo${i} /></DemoBox>`
    }
  }
}
const getDemoBox = (node) => {
  if (!node.children) {
    return []
  }
  const arr = []
  for (const child of node.children) {
    if (child.type === NAME) {
      arr.push(child)
    } else {
      arr.concat(getDemoBox(child))
    }
  }
  return arr
}

const getContent = (file, demo) => {
  const fileAbsPath = path.resolve(file.dirname, demo)
  return fs.readFileSync(fileAbsPath, 'utf-8')
}

const converter = new HTMLtoJSX({
  createClass: false
})

const highlightCode = (language, content) => {
  loadLanguages([language])
  const grammar = languages[language]
  return converter.convert(
    `<pre class="language-${language}"><code>${highlight(content, grammar, language)}</code></pre>`
  )
}
