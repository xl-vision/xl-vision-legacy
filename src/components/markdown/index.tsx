import * as React from 'react'
import HeadingRender from './render/heading'
import BoldRender from './render/bold'

export interface Render {
  match: RegExp
  render: (
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) => React.ReactNode
}

export interface PreProcessor {}

export interface PostProcessor {}

export interface MarkdownProps {
  children: string
}
export default class Markdown extends React.Component<MarkdownProps, {}> {
  rules: Array<Render> = [new HeadingRender(), new BoldRender()]
  preProcessors: Array<PreProcessor> = []
  postProcessors: Array<PostProcessor> = []

  render() {
    const { children } = this.props
    // 预处理
    const preContent = doPreProcess(children, this.preProcessors)
    // 渲染
    let elements = doRender(preContent, this.rules)
    // 后处理
    elements = doPostProcessor(elements, this.postProcessors)
    return <div>{elements}</div>
  }
}

function doPreProcess(content: string, preProcessors: Array<PreProcessor>) {
  return content
}

function doPostProcessor(
  elements: Array<React.ReactNode>,
  postProcessors: Array<PostProcessor>
) {
  return elements
}

function doRender(source: string, rules: Array<Render>) {
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
        return doRender(innerStr, rules)
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
  const newArr: Array<React.ReactNode> = []
  // 设置key
  arr.forEach((it: React.ReactNode, index: number) => {
    let element = it
    if (React.isValidElement(element)) {
      element = React.createElement(element.type, {
        ...element.props,
        key: index
      })
    }
    newArr.push(element)
  })
  return newArr
}
