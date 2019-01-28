import * as React from 'react'
import { Render } from '..'

export default class HeadingRender implements Render {
  name = 'heading'
  match = /^ *(#{1,6}) *([^\n]+)\n?/
  render(
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) {
    const level = capture[1].length
    const text = capture[2]
    return React.createElement(`h${level}`, {}, next(text))
  }
}
