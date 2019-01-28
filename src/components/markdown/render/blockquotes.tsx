import * as React from 'react'
import { Render } from '..'

export default class BlockquotesRender implements Render {
  name: 'blockquotes'
  match = /^( *>[^\n]+(\n[^\n]+)*)+/
  render(
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) {
    const text = capture[1]
    const ret = text
      .replace(/^ *>/, '')
      .replace(/\n *>/g, '\n')
      .replace(/\n$/, '')
    return <blockquote>{next(ret)}</blockquote>
  }
}
