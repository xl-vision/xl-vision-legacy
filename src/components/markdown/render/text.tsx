import * as React from 'react'
import { Render } from '..'

export default class TextRender implements Render {
  name: 'text'
  match = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i
  render(
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) {
    const text = capture[0]
    return <span>{text}</span>
  }
}
