import * as React from 'react'
import HeadingRender from './render/heading'
import BoldRender from './render/bold'
import ItalicRender from './render/italic'
import StrikethroughRender from './render/strikethrough'
import BlockquotesRender from './render/blockquotes'
import BrRender from './render/br'
import TextRender from './render/text'
import KeyPostProcessor from './postProcessor/key'

export interface Render {
  name: string
  match: RegExp
  render: (
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) => React.ReactNode
}

export interface PreProcessor {
  name: string
  process: (content: string, deep: number) => string
}

export interface PostProcessor {
  name: string
  process: (
    elements: Array<React.ReactNode>,
    deep: number
  ) => Array<React.ReactNode>
}

export interface MarkdownProps {
  children: string
}
export default class Markdown extends React.Component<MarkdownProps, {}> {
  rules: Array<Render> = [
    new HeadingRender(),
    new BoldRender(),
    new ItalicRender(),
    new StrikethroughRender(),
    new BlockquotesRender(),
    new BrRender()
    // new TextRender()
  ]
  preProcessors: Array<PreProcessor> = []
  postProcessors: Array<PostProcessor> = [new KeyPostProcessor()]

  render() {
    const { children } = this.props

    // 渲染
    const elements = doRender(
      children,
      this.rules,
      this.preProcessors,
      this.postProcessors,
      0
    )
    return <div>{elements}</div>
  }
}

function doPreProcess(
  content: string,
  preProcessors: Array<PreProcessor>,
  deep: number
) {
  let ret = content
  preProcessors.forEach(it => {
    ret = it.process(ret, deep)
  })
  return ret
}

function doPostProcessor(
  elements: Array<React.ReactNode>,
  postProcessors: Array<PostProcessor>,
  deep: number
) {
  let ret = elements
  postProcessors.forEach(it => {
    ret = it.process(ret, deep)
  })
  return ret
}

function doRender(
  source: string,
  rules: Array<Render>,
  preProcessors: PreProcessor[],
  postProcessors: PostProcessor[],
  deep: number
) {
  // 预处理
  const preContent = doPreProcess(source, preProcessors, deep)
  const arr: Array<React.ReactNode> = []
  let leaveSource = source
  let prevStr = ''
  let text = ''
  while (leaveSource) {
    let i = 0
    for (; i < rules.length; i++) {
      const rule = rules[i]
      const capture = leaveSource.match(rule.match)
      if (!capture) {
        continue
      }
      prevStr = capture[0]
      if (!prevStr) {
        continue
      }
      if (text) {
        arr.push(text)
        text = ''
      }
      const renderRet = rule.render(capture, source, (innerStr: string) => {
        if (!innerStr || innerStr.length === 0) {
          return []
        }
        return doRender(
          innerStr,
          rules,
          preProcessors,
          postProcessors,
          deep + 1
        )
      })
      arr.push(renderRet)
      break
    }

    if (i >= rules.length) {
      const char = (prevStr = leaveSource.charAt(0))
      text += char
    }
    leaveSource = leaveSource.substring(prevStr.length)
  }
  if (text) {
    arr.push(text)
  }

  // 后处理
  return doPostProcessor(arr, postProcessors, deep)
}
