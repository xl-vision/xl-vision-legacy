import * as React from 'react'
import { Render } from '..'

export default class BrRender implements Render {
  name: 'br'
  match = /^\n/
  render(
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) {
    return <br />
  }
}
