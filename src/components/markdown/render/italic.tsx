import * as React from 'react'
import { Render } from '..'

export default class ItalicRender implements Render {
  name: 'italic'
  match = /^((\*([^\n\*][^\n]*[^\n\*])\*)|(_([^\n_][^\n]*[^\n_])_))/
  render(
    capture: RegExpMatchArray,
    content: string,
    next: (captureContent: string) => Array<React.ReactNode>
  ) {
    const text = capture[3] || capture[5]
    return <em>{next(text)}</em>
  }
}
