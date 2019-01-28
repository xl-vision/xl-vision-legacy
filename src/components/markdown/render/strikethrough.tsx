import * as React from 'react'
import { Render } from '..'

export default class StrikethroughRender implements Render {
  name: 'strikethrough'
  match = /^~~([^\n]*)~~/
  render(
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) {
    const text = capture[1]
    return <del>{next(text)}</del>
  }
}
