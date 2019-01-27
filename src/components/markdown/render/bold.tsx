import * as React from 'react'
import { Render } from '..'

export default class BoldRender implements Render {
  match = /^\*\*([^\n\*]*)\*\*/
  render(
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) {
    const text = capture[1]
    return <b>{next(text)}</b>
  }
}
