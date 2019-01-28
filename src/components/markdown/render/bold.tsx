import * as React from 'react'
import { Render } from '..'

export default class BoldRender implements Render {
  name: 'bold'
  match = /^((\*\*([^\n]*)\*\*)|(__([^\n]*)__))/
  render(
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) {
    const text = capture[3] || capture[5]
    return <strong>{next(text)}</strong>
  }
}
